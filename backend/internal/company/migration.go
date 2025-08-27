package company

import (
	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/pkg/database"
)

func Migrate() {
	database.DB.AutoMigrate(&model.Company{}, &model.Location{}, &model.Revenue{}, &model.FundingRound{}, &model.Technology{})
}
