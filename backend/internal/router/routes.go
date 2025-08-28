package router

import (
	"github.com/bhati00/Fynelo/backend/config"
	"github.com/bhati00/Fynelo/backend/internal/company"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
	"github.com/bhati00/Fynelo/backend/internal/company/service"
	"github.com/bhati00/Fynelo/backend/internal/icp"
	"github.com/bhati00/Fynelo/backend/internal/queue"
	"github.com/bhati00/Fynelo/backend/pkg/database"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	cfg := config.LoadConfig()
	db := database.ConnectDatabase(cfg)

	// Queue service
	queueService := queue.NewQueueService()
	queueHandler := queue.NewHandler(queueService)

	// ICP builder
	icpRepo := icp.NewRepository(db)         // Initialize the repository with the database connection
	icpService := icp.NewService(icpRepo)    // Initialize the service with the database connection
	icpHandler := icp.NewHandler(icpService) // Create a new handler with the service

	// Company management
	companyRepo := repositories.NewCompanyRepository(db)
	companyService := service.NewCompanyService(companyRepo, queueService)
	companyHandler := company.NewHandler(companyService)

	// Register feature routes
	icp.RegisterICPRoutes(api, icpHandler)
	company.RegisterCompanyRoutes(api, companyHandler)
	queue.RegisterQueueRoutes(api, queueHandler)
}
