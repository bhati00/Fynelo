package main

import (
	"log"

	app "github.com/bhati00/Fynelo/backend/internal/bootstrap"
	"github.com/bhati00/Fynelo/backend/config"
	"github.com/bhati00/Fynelo/backend/internal/company"
	"github.com/bhati00/Fynelo/backend/internal/icp"
	"github.com/bhati00/Fynelo/backend/pkg/database"
)

func main() {
	// Initialize database and run migrations
	cfg := config.LoadConfig()
	_ = database.ConnectDatabase(cfg) // Connect and store in global DB variable
	
	log.Println("Running database migrations...")
	company.Migrate()
	icp.Migrate()
	log.Println("Database migrations completed")

	r := app.InitializeApp()

	log.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}
