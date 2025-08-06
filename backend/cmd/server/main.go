package main

import (
	"github.com/bhati00/Fynelo/backend/config"
	"github.com/bhati00/Fynelo/backend/pkg/database"
)

func main() {
	cfg := config.LoadConfig()
	database.ConnectDatabase(cfg)
	database.AutoMigrate()
}
