package icp

import "github.com/gin-gonic/gin"

func RegisterICPRoutes(rg *gin.RouterGroup, h *Handler) {
	icp := rg.Group("/icp")
	{
		icp.POST("", h.CreateICPHandler)
		icp.GET("/:id", h.GetICPByIDHandler)
		icp.GET("/user", h.ListICPsByUserHandler)
		icp.PUT("/:id", h.UpdateICPHandler)
		icp.DELETE("/:id", h.DeleteICPHandler)
	}
}
