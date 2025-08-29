package worker

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type HealthServer struct {
	worker *Worker
	port   string
}

func NewHealthServer(worker *Worker, port string) *HealthServer {
	return &HealthServer{
		worker: worker,
		port:   port,
	}
}

// Start starts the health check HTTP server
func (hs *HealthServer) Start() {
	mux := http.NewServeMux()
	
	// Health check endpoint
	mux.HandleFunc("/healthz", hs.healthHandler)
	
	// Stats endpoint
	mux.HandleFunc("/stats", hs.statsHandler)
	
	server := &http.Server{
		Addr:         ":" + hs.port,
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  15 * time.Second,
	}
	
	log.Printf("Health server starting on port %s", hs.port)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Printf("Health server error: %v", err)
	}
}

// healthHandler handles health check requests
func (hs *HealthServer) healthHandler(w http.ResponseWriter, r *http.Request) {
	stats := hs.worker.GetStats()
	
	// Check if Redis is available
	redisAvailable, ok := stats["redis_available"].(bool)
	if !ok || !redisAvailable {
		w.WriteHeader(http.StatusServiceUnavailable)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":    "unhealthy",
			"error":     "Redis not available",
			"timestamp": time.Now().UTC(),
		})
		return
	}
	
	// Healthy response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":    "healthy",
		"timestamp": time.Now().UTC(),
	})
}

// statsHandler handles stats requests
func (hs *HealthServer) statsHandler(w http.ResponseWriter, r *http.Request) {
	stats := hs.worker.GetStats()
	stats["timestamp"] = time.Now().UTC()
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}