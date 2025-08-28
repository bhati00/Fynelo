package queue

import (
	"time"
)

type JobStatus string

const (
	StatusPending    JobStatus = "pending"
	StatusProcessing JobStatus = "processing"
	StatusCompleted  JobStatus = "completed"
	StatusFailed     JobStatus = "failed"
)

type JobPriority int

const (
	PriorityLow    JobPriority = 1
	PriorityNormal JobPriority = 2
	PriorityHigh   JobPriority = 3
	PriorityUrgent JobPriority = 4
)

type SearchFilters struct {
	Industry     string `json:"industry,omitempty"`
	EmployeeSize string `json:"employee_size,omitempty"`
	Location     string `json:"location,omitempty"`
	FundingStage string `json:"funding_stage,omitempty"`
	FoundedMin   *int   `json:"founded_min,omitempty"`
	FoundedMax   *int   `json:"founded_max,omitempty"`
	Status       string `json:"status,omitempty"`
}

type SearchJob struct {
	ID          string        `json:"id"`
	UserID      uint          `json:"user_id,omitempty"`
	Query       string        `json:"query"`
	Filters     SearchFilters `json:"filters"`
	Status      JobStatus     `json:"status"`
	Priority    JobPriority   `json:"priority"`
	CreatedAt   time.Time     `json:"created_at"`
	ProcessedAt *time.Time    `json:"processed_at,omitempty"`
	CompletedAt *time.Time    `json:"completed_at,omitempty"`
	ResultCount int           `json:"result_count"`
	ErrorMsg    string        `json:"error_msg,omitempty"`
	// For future use
	RetryCount int `json:"retry_count"`
	MaxRetries int `json:"max_retries"`
}

// IsExpired checks if job is older than 24 hours
func (j *SearchJob) IsExpired() bool {
	return time.Since(j.CreatedAt) > 24*time.Hour
}

// CanRetry checks if job can be retried
func (j *SearchJob) CanRetry() bool {
	return j.RetryCount < j.MaxRetries
}

// MarkProcessing updates job status to processing
func (j *SearchJob) MarkProcessing() {
	j.Status = StatusProcessing
	now := time.Now()
	j.ProcessedAt = &now
}

// MarkCompleted updates job status to completed
func (j *SearchJob) MarkCompleted(resultCount int) {
	j.Status = StatusCompleted
	j.ResultCount = resultCount
	now := time.Now()
	j.CompletedAt = &now
}

// MarkFailed updates job status to failed
func (j *SearchJob) MarkFailed(errorMsg string) {
	j.Status = StatusFailed
	j.ErrorMsg = errorMsg
	j.RetryCount++
	now := time.Now()
	j.CompletedAt = &now
}
