package company

import (
	"github.com/bhati00/Fynelo/backend/pkg/database"
)

func Migrate() {
	database.DB.AutoMigrate(&Company{}, &Industry{}, &Location{}, &Revenue{}, &FundingRound{}, &Technology{})
}
