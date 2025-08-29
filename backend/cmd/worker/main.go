package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/bhati00/Fynelo/backend/config"
	"github.com/bhati00/Fynelo/backend/internal/company"
	"github.com/bhati00/Fynelo/backend/internal/icp"
	"github.com/bhati00/Fynelo/backend/internal/worker"
	"github.com/bhati00/Fynelo/backend/pkg/database"
	redisClient "github.com/bhati00/Fynelo/backend/pkg/redis"
)

func main() {
	log.Println("Starting background worker...")

	// Load configuration
	cfg := config.LoadConfig()

	// Initialize database and run migrations
	log.Println("Connecting to database...")
	db := database.ConnectDatabase(cfg)
	if db == nil {
		log.Fatal("Failed to connect to database")
	}

	log.Println("Running database migrations...")
	company.Migrate()
	icp.Migrate()
	log.Println("Database migrations completed")

	// Initialize Redis
	log.Println("Connecting to Redis...")
	redis := redisClient.ConnectRedis(cfg.Redis)
	if redis == nil {
		log.Fatal("Failed to connect to Redis - worker cannot function without Redis")
	}

	// Test Redis connection
	if err := redisClient.IsConnected(); !err {
		log.Fatal("Redis connection test failed")
	}
	log.Println("Redis connected successfully")

	// Create worker
	workerInstance := worker.NewWorker(redis, db)

	// Setup graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Handle shutdown signals
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	// Start health server in goroutine
	healthServer := worker.NewHealthServer(workerInstance, "8081")
	go healthServer.Start()

	// Start worker in goroutine
	go func() {
		log.Println("Starting worker loop...")
		if err := workerInstance.Start(ctx); err != nil {
			log.Printf("Worker error: %v", err)
			cancel()
		}
	}()

	// Wait for shutdown signal
	<-sigChan
	log.Println("Received shutdown signal, stopping worker...")

	// Graceful shutdown
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), worker.ShutdownTimeout)
	defer shutdownCancel()

	if err := workerInstance.Shutdown(shutdownCtx); err != nil {
		log.Printf("Error during shutdown: %v", err)
	}

	log.Println("Worker stopped gracefully")
}