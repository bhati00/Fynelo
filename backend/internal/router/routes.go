package router

import (
	"github.com/bhati00/Fynelo/backend/config"
	"github.com/bhati00/Fynelo/backend/internal/icp"
	"github.com/bhati00/Fynelo/backend/pkg/database"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	cfg := config.LoadConfig()
	db := database.ConnectDatabase(cfg)

	// ICP builder
	icpRepo := icp.NewRepository(db)         // Initialize the repository with the database connection
	icpService := icp.NewService(icpRepo)    // Initialize the service with the database connection
	icpHandler := icp.NewHandler(icpService) // Create a new handler with the service

	// Register feature routes
	icp.RegisterICPRoutes(api, icpHandler)
}
