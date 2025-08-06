package database

import (
	"github.com/bhati00/Fynelo/backend/internal/icp/model"
)

func AutoMigrate() {
	Db.AutoMigrate(&model.ICPProfile{})
}
