package main

import (
	"log"

	"github.com/bhati00/Fynelo/backend/config"
	app "github.com/bhati00/Fynelo/backend/internal/bootstrap"
	"github.com/bhati00/Fynelo/backend/internal/company"
	"github.com/bhati00/Fynelo/backend/internal/icp"
	"github.com/bhati00/Fynelo/backend/pkg/database"
	redisClient "github.com/bhati00/Fynelo/backend/pkg/redis"
)

func main() {
	// Initialize database and run migrations
	cfg := config.LoadConfig()
	_ = database.ConnectDatabase(cfg) // Connect and store in global DB variable

	log.Println("Running database migrations...")
	company.Migrate()
	icp.Migrate()
	log.Println("Database migrations completed")
	// Initialize Redis (graceful fallback if unavailable)
	log.Println("Connecting to Redis...")
	redisClient.ConnectRedis(cfg.Redis)

	r := app.InitializeApp()

	log.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}
