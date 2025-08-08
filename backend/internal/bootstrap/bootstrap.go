package bootstrap

import (
	"github.com/bhati00/Fynelo/backend/docs"
	"github.com/bhati00/Fynelo/backend/internal/router"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Fynelo API
// @version 1.0
// @description This is the backend API for Fynelo.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.email support@fynelo.com

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @host localhost:8080
// @BasePath /api/v1
func InitializeApp() *gin.Engine {
	r := gin.Default()

	docs.SwaggerInfo.BasePath = "/api"
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	// Register all routes
	router.SetupRoutes(r)

	return r
}
