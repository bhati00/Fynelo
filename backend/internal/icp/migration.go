package icp

import (
	"github.com/bhati00/Fynelo/backend/pkg/database"
)

func Migrate() {
	database.DB.AutoMigrate(&ICPProfile{})
}
