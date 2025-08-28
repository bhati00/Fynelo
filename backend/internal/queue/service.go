package queue

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/go-redis/redis/v8"
	redisClient "github.com/bhati00/Fynelo/backend/pkg/redis"
)

const (
	// Redis keys
	SearchQueueKey    = "search_queue"
	JobKeyPrefix      = "search_job:"
	JobCounterKey     = "search_job_counter"
	UserJobsKeyPrefix = "user_jobs:"
)

type QueueService interface {
	// Job Management
	EnqueueSearch(job *SearchJob) error
	DequeueSearch() (*SearchJob, error)
	UpdateJobStatus(jobID string, status JobStatus, resultCount int, errorMsg string) error
	
	// Job Queries
	GetJobStatus(jobID string) (*SearchJob, error)
	GetUserJobs(userID uint) ([]SearchJob, error)
	
	// Maintenance
	CleanupExpiredJobs() error
	GetQueueLength() (int64, error)
	
	// Health Check
	Ping() error
}

type queueService struct {
	client *redis.Client
}

func NewQueueService() QueueService {
	return &queueService{
		client: redisClient.RedisClient,
	}
}

func (q *queueService) EnqueueSearch(job *SearchJob) error {
	if q.client == nil {
		return fmt.Errorf("redis not available")
	}

	ctx := context.Background()
	
	// Generate sequential job ID
	jobID, err := q.generateJobID()
	if err != nil {
		return fmt.Errorf("failed to generate job ID: %w", err)
	}
	
	job.ID = jobID
	job.CreatedAt = time.Now()
	job.Status = StatusPending
	if job.Priority == 0 {
		job.Priority = PriorityNormal
	}
	if job.MaxRetries == 0 {
		job.MaxRetries = 3
	}

	// Serialize job
	jobData, err := json.Marshal(job)
	if err != nil {
		return fmt.Errorf("failed to serialize job: %w", err)
	}

	// Store job details
	jobKey := JobKeyPrefix + jobID
	if err := q.client.Set(ctx, jobKey, jobData, 24*time.Hour).Err(); err != nil {
		return fmt.Errorf("failed to store job: %w", err)
	}

	// Add to queue
	if err := q.client.LPush(ctx, SearchQueueKey, jobID).Err(); err != nil {
		return fmt.Errorf("failed to enqueue job: %w", err)
	}

	// Track user jobs
	if job.UserID > 0 {
		userJobsKey := UserJobsKeyPrefix + strconv.Itoa(int(job.UserID))
		if err := q.client.SAdd(ctx, userJobsKey, jobID).Err(); err != nil {
			return fmt.Errorf("failed to track user job: %w", err)
		}
		// Set expiry for user jobs tracking
		q.client.Expire(ctx, userJobsKey, 24*time.Hour)
	}

	return nil
}

func (q *queueService) DequeueSearch() (*SearchJob, error) {
	if q.client == nil {
		return nil, fmt.Errorf("redis not available")
	}

	ctx := context.Background()
	
	// Block for up to 5 seconds waiting for a job
	result, err := q.client.BRPop(ctx, 5*time.Second, SearchQueueKey).Result()
	if err != nil {
		if err == redis.Nil {
			return nil, nil // No job available
		}
		return nil, fmt.Errorf("failed to dequeue job: %w", err)
	}

	if len(result) != 2 {
		return nil, fmt.Errorf("invalid dequeue result")
	}

	jobID := result[1]
	job, err := q.GetJobStatus(jobID)
	if err != nil {
		return nil, fmt.Errorf("failed to get job details: %w", err)
	}

	return job, nil
}

func (q *queueService) UpdateJobStatus(jobID string, status JobStatus, resultCount int, errorMsg string) error {
	if q.client == nil {
		return fmt.Errorf("redis not available")
	}

	ctx := context.Background()
	jobKey := JobKeyPrefix + jobID

	// Get current job
	job, err := q.GetJobStatus(jobID)
	if err != nil {
		return err
	}

	// Update status
	job.Status = status
	if resultCount > 0 {
		job.ResultCount = resultCount
	}
	if errorMsg != "" {
		job.ErrorMsg = errorMsg
		job.RetryCount++
	}

	now := time.Now()
	if status == StatusProcessing {
		job.ProcessedAt = &now
	} else if status == StatusCompleted || status == StatusFailed {
		job.CompletedAt = &now
	}

	// Serialize and save
	jobData, err := json.Marshal(job)
	if err != nil {
		return fmt.Errorf("failed to serialize job: %w", err)
	}

	return q.client.Set(ctx, jobKey, jobData, 24*time.Hour).Err()
}

func (q *queueService) GetJobStatus(jobID string) (*SearchJob, error) {
	if q.client == nil {
		return nil, fmt.Errorf("redis not available")
	}

	ctx := context.Background()
	jobKey := JobKeyPrefix + jobID

	jobData, err := q.client.Get(ctx, jobKey).Result()
	if err != nil {
		if err == redis.Nil {
			return nil, fmt.Errorf("job not found")
		}
		return nil, fmt.Errorf("failed to get job: %w", err)
	}

	var job SearchJob
	if err := json.Unmarshal([]byte(jobData), &job); err != nil {
		return nil, fmt.Errorf("failed to deserialize job: %w", err)
	}

	return &job, nil
}

func (q *queueService) GetUserJobs(userID uint) ([]SearchJob, error) {
	if q.client == nil {
		return nil, fmt.Errorf("redis not available")
	}

	ctx := context.Background()
	userJobsKey := UserJobsKeyPrefix + strconv.Itoa(int(userID))

	jobIDs, err := q.client.SMembers(ctx, userJobsKey).Result()
	if err != nil {
		return nil, fmt.Errorf("failed to get user jobs: %w", err)
	}

	var jobs []SearchJob
	for _, jobID := range jobIDs {
		job, err := q.GetJobStatus(jobID)
		if err != nil {
			continue // Skip jobs that can't be retrieved
		}
		jobs = append(jobs, *job)
	}

	return jobs, nil
}

func (q *queueService) CleanupExpiredJobs() error {
	if q.client == nil {
		return fmt.Errorf("redis not available")
	}

	// This is a basic implementation
	// In production, you'd want a more efficient cleanup process
	ctx := context.Background()
	
	// Get all job keys
	keys, err := q.client.Keys(ctx, JobKeyPrefix+"*").Result()
	if err != nil {
		return fmt.Errorf("failed to get job keys: %w", err)
	}

	cleanedCount := 0
	for _, key := range keys {
		jobData, err := q.client.Get(ctx, key).Result()
		if err != nil {
			continue
		}

		var job SearchJob
		if err := json.Unmarshal([]byte(jobData), &job); err != nil {
			continue
		}

		if job.IsExpired() {
			q.client.Del(ctx, key)
			cleanedCount++
		}
	}

	if cleanedCount > 0 {
		fmt.Printf("Cleaned up %d expired jobs\n", cleanedCount)
	}

	return nil
}

func (q *queueService) GetQueueLength() (int64, error) {
	if q.client == nil {
		return 0, fmt.Errorf("redis not available")
	}

	ctx := context.Background()
	return q.client.LLen(ctx, SearchQueueKey).Result()
}

func (q *queueService) Ping() error {
	if q.client == nil {
		return fmt.Errorf("redis not available")
	}

	ctx := context.Background()
	return q.client.Ping(ctx).Err()
}

func (q *queueService) generateJobID() (string, error) {
	ctx := context.Background()
	
	// Increment counter and get new ID
	counter, err := q.client.Incr(ctx, JobCounterKey).Result()
	if err != nil {
		return "", err
	}
	
	return fmt.Sprintf("search_%d", counter), nil
}