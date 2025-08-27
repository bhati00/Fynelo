package repositories

import (
	"context"

	models "github.com/bhati00/Fynelo/backend/internal/company/model"

	"gorm.io/gorm"
)

type FundingRepository interface {
	Create(ctx context.Context, FundingRound *models.FundingRound) error
	FindByCompanyID(ctx context.Context, companyID uint) ([]models.FundingRound, error)
}

type fundingRepo struct {
	db *gorm.DB
}

func NewFundingRepository(db *gorm.DB) FundingRepository {
	return &fundingRepo{db}
}

func (r *fundingRepo) Create(ctx context.Context, FundingRound *models.FundingRound) error {
	return r.db.WithContext(ctx).Create(FundingRound).Error
}

func (r *fundingRepo) FindByCompanyID(ctx context.Context, companyID uint) ([]models.FundingRound, error) {
	var fundings []models.FundingRound
	if err := r.db.WithContext(ctx).Where("company_id = ?", companyID).Find(&fundings).Error; err != nil {
		return nil, err
	}
	return fundings, nil
}
