package queue

import "github.com/gin-gonic/gin"

func RegisterQueueRoutes(rg *gin.RouterGroup, h *Handler) {
	jobs := rg.Group("/jobs")
	{
		jobs.GET("/stats", h.GetQueueStatsHandler)
		jobs.GET("/:id", h.GetJobStatusHandler)
		jobs.GET("/user/:user_id", h.GetUserJobsHandler)
	}
}