package repositories

import (
	"context"

	"github.com/bhati00/Fynelo/backend/internal/company/model"

	"gorm.io/gorm"
)

type RevenueRepository interface {
	Create(ctx context.Context, revenue *model.Revenue) error
	FindByCompanyID(ctx context.Context, companyID uint) ([]model.Revenue, error)
}

type revenueRepo struct {
	db *gorm.DB
}

func NewRevenueRepository(db *gorm.DB) RevenueRepository {
	return &revenueRepo{db}
}

func (r *revenueRepo) Create(ctx context.Context, revenue *model.Revenue) error {
	return r.db.WithContext(ctx).Create(revenue).Error
}

func (r *revenueRepo) FindByCompanyID(ctx context.Context, companyID uint) ([]model.Revenue, error) {
	var revenues []model.Revenue
	if err := r.db.WithContext(ctx).Where("company_id = ?", companyID).Find(&revenues).Error; err != nil {
		return nil, err
	}
	return revenues, nil
}
