package company

import (
	"gorm.io/gorm"
)

type FundingRepository struct {
	db *gorm.DB
}

func NewFundingRepository(db *gorm.DB) *FundingRepository {
	return &FundingRepository{db: db}
}

func (r *FundingRepository) AddFundingRound(funding *FundingRound) error {
	return r.db.Create(funding).Error
}

func (r *FundingRepository) GetByCompany(companyID uint) ([]FundingRound, error) {
	var rounds []FundingRound
	err := r.db.Where("company_id = ?", companyID).Find(&rounds).Error
	return rounds, err
}
