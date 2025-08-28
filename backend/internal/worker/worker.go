package worker

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/bhati00/Fynelo/backend/internal/queue"
	"github.com/go-redis/redis/v8"
	"gorm.io/gorm"
)

const (
	// Worker configuration
	DequeueTimeout = 5 * time.Second
	ShutdownTimeout = 30 * time.Second
	DefaultMaxRetries = 3
	
	// Backoff configuration
	BaseBackoff = 1 * time.Second
	MaxBackoff = 10 * time.Second
)

type Worker struct {
	queueService queue.QueueService
	db           *gorm.DB
	stopChan     chan struct{}
}

func NewWorker(redisClient *redis.Client, db *gorm.DB) *Worker {
	return &Worker{
		queueService: queue.NewQueueService(),
		db:           db,
		stopChan:     make(chan struct{}),
	}
}

// Start begins the worker loop
func (w *Worker) Start(ctx context.Context) error {
	log.Println("Worker started, waiting for jobs...")
	
	for {
		select {
		case <-ctx.Done():
			log.Println("Worker context cancelled")
			return ctx.Err()
		case <-w.stopChan:
			log.Println("Worker stop signal received")
			return nil
		default:
			// Continue processing
		}

		// Try to dequeue a job
		job, err := w.queueService.DequeueSearch()
		if err != nil {
			log.Printf("Error dequeuing job: %v", err)
			time.Sleep(1 * time.Second) // Brief pause before retry
			continue
		}

		if job == nil {
			// No job available, continue loop
			continue
		}

		// Process the job
		w.processJob(job)
	}
}

// processJob handles a single job with retry logic
func (w *Worker) processJob(job *queue.SearchJob) {
	startTime := time.Now()
	log.Printf("Processing job %s: %s", job.ID, job.Query)

	// Mark job as processing
	if err := w.queueService.UpdateJobStatus(job.ID, queue.StatusProcessing, 0, ""); err != nil {
		log.Printf("Failed to mark job %s as processing: %v", job.ID, err)
		return
	}

	// Process with retries
	var lastError error
	maxRetries := job.MaxRetries
	if maxRetries == 0 {
		maxRetries = DefaultMaxRetries
	}

	for attempt := 1; attempt <= maxRetries; attempt++ {
		log.Printf("Job %s: attempt %d/%d", job.ID, attempt, maxRetries)

		// Process the job
		resultCount, err := w.processSearchJob(job)
		if err == nil {
			// Success
			duration := time.Since(startTime)
			log.Printf("Job %s completed successfully in %v: %d results", job.ID, duration, resultCount)
			
			if updateErr := w.queueService.UpdateJobStatus(job.ID, queue.StatusCompleted, resultCount, ""); updateErr != nil {
				log.Printf("Failed to update job %s status to completed: %v", job.ID, updateErr)
			}
			return
		}

		lastError = err
		log.Printf("Job %s attempt %d failed: %v", job.ID, attempt, err)

		// Check if we should retry
		if !w.shouldRetry(err) {
			log.Printf("Job %s: non-retryable error, marking as failed", job.ID)
			break
		}

		if attempt < maxRetries {
			// Calculate backoff
			backoff := w.calculateBackoff(attempt)
			log.Printf("Job %s: retrying in %v", job.ID, backoff)
			time.Sleep(backoff)
		}
	}

	// All retries exhausted or non-retryable error
	duration := time.Since(startTime)
	log.Printf("Job %s failed after %d attempts in %v: %v", job.ID, maxRetries, duration, lastError)
	
	if updateErr := w.queueService.UpdateJobStatus(job.ID, queue.StatusFailed, 0, lastError.Error()); updateErr != nil {
		log.Printf("Failed to update job %s status to failed: %v", job.ID, updateErr)
	}
}

// processSearchJob is the actual job processing logic (Phase 5 placeholder)
func (w *Worker) processSearchJob(job *queue.SearchJob) (int, error) {
	// TODO: Phase 5 - Replace with actual enrichment logic
	// For now, simulate processing time and return mock results
	
	log.Printf("Processing search job: query='%s', filters=%+v", job.Query, job.Filters)
	
	// Simulate processing time
	time.Sleep(2 * time.Second)
	
	// Simulate some failures for testing retry logic
	if job.Query == "fail" {
		return 0, fmt.Errorf("simulated failure for testing")
	}
	
	// Return mock result count
	resultCount := 15 // Mock: found 15 companies
	log.Printf("Mock enrichment completed: found %d companies", resultCount)
	
	return resultCount, nil
}

// shouldRetry determines if an error is retryable
func (w *Worker) shouldRetry(err error) bool {
	// TODO: Implement more sophisticated error classification
	// For now, retry all errors except specific ones
	
	errorMsg := err.Error()
	
	// Non-retryable errors
	nonRetryableErrors := []string{
		"validation failed",
		"invalid query",
		"unauthorized",
	}
	
	for _, nonRetryable := range nonRetryableErrors {
		if errorMsg == nonRetryable {
			return false
		}
	}
	
	return true
}

// calculateBackoff returns the backoff duration for a given attempt
func (w *Worker) calculateBackoff(attempt int) time.Duration {
	// Exponential backoff: 1s, 2s, 4s, 8s, etc.
	backoff := BaseBackoff * time.Duration(1<<(attempt-1))
	
	// Cap at maximum backoff
	if backoff > MaxBackoff {
		backoff = MaxBackoff
	}
	
	return backoff
}

// Shutdown gracefully stops the worker
func (w *Worker) Shutdown(ctx context.Context) error {
	log.Println("Shutting down worker...")
	
	// Signal the worker loop to stop
	close(w.stopChan)
	
	// Wait for context timeout or completion
	<-ctx.Done()
	
	log.Println("Worker shutdown complete")
	return nil
}

// GetStats returns worker statistics
func (w *Worker) GetStats() map[string]interface{} {
	queueLength, err := w.queueService.GetQueueLength()
	if err != nil {
		queueLength = -1
	}
	
	return map[string]interface{}{
		"queue_length": queueLength,
		"redis_available": w.queueService.Ping() == nil,
	}
}