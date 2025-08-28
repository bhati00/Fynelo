package queue

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	queueService QueueService
}

func NewHandler(queueService QueueService) *Handler {
	return &Handler{
		queueService: queueService,
	}
}

// GetJobStatusHandler godoc
// @Summary Get job status by ID
// @Description Get the status of a search job by its ID
// @Tags Queue
// @Accept json
// @Produce json
// @Param id path string true "Job ID"
// @Success 200 {object} SearchJob
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 503 {object} map[string]string
// @Router /jobs/{id} [get]
func (h *Handler) GetJobStatusHandler(c *gin.Context) {
	jobID := c.Param("id")
	if jobID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Job ID is required"})
		return
	}

	job, err := h.queueService.GetJobStatus(jobID)
	if err != nil {
		if err.Error() == "job not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
			return
		}
		if err.Error() == "redis not available" {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Queue service unavailable"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get job status"})
		return
	}

	c.JSON(http.StatusOK, job)
}

// GetUserJobsHandler godoc
// @Summary Get user's jobs
// @Description Get all jobs for a specific user
// @Tags Queue
// @Accept json
// @Produce json
// @Param user_id path int true "User ID"
// @Success 200 {array} SearchJob
// @Failure 400 {object} map[string]string
// @Failure 503 {object} map[string]string
// @Router /jobs/user/{user_id} [get]
func (h *Handler) GetUserJobsHandler(c *gin.Context) {
	userIDStr := c.Param("user_id")
	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	jobs, err := h.queueService.GetUserJobs(uint(userID))
	if err != nil {
		if err.Error() == "redis not available" {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Queue service unavailable"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user jobs"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"jobs":  jobs,
		"count": len(jobs),
	})
}

// GetQueueStatsHandler godoc
// @Summary Get queue statistics
// @Description Get current queue statistics and health
// @Tags Queue
// @Accept json
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Failure 503 {object} map[string]string
// @Router /jobs/stats [get]
func (h *Handler) GetQueueStatsHandler(c *gin.Context) {
	// Check Redis availability
	if err := h.queueService.Ping(); err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"error":     "Queue service unavailable",
			"available": false,
		})
		return
	}

	queueLength, err := h.queueService.GetQueueLength()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get queue stats"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"available":    true,
		"queue_length": queueLength,
		"status":       "healthy",
	})
}