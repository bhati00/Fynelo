package redis

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/bhati00/Fynelo/backend/config"
	"github.com/go-redis/redis/v8"
)

var RedisClient *redis.Client

// ConnectRedis initializes Redis connection
func ConnectRedis(cfg config.RedisConfig) *redis.Client {
	addr := fmt.Sprintf("%s:%s", cfg.Host, cfg.Port)

	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: cfg.Password,
		DB:       cfg.DB,
	})

	// Test connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := client.Ping(ctx).Result()
	if err != nil {
		log.Printf("Warning: Redis connection failed: %v", err)
		log.Println("Queue functionality will be disabled")
		return nil
	}

	log.Printf("Redis connected successfully at %s", addr)
	RedisClient = client
	return client
}

// IsConnected checks if Redis is available
func IsConnected() bool {
	if RedisClient == nil {
		return false
	}

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	_, err := RedisClient.Ping(ctx).Result()
	return err == nil
}

// Close closes the Redis connection
func Close() error {
	if RedisClient != nil {
		return RedisClient.Close()
	}
	return nil
}
