package main

import (
	"log"

	app "github.com/bhati00/Fynelo/backend/internal/bootstrap"
)

func main() {
	r := app.InitializeApp()

	log.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}
