package repositories

import (
	"context"

	models "github.com/bhati00/Fynelo/backend/internal/company/model"
	"gorm.io/gorm"
)

type IndustryRepository interface {
	Create(ctx context.Context, industry *models.Industry) error
	FindAll(ctx context.Context) ([]models.Industry, error)
}

type industryRepo struct {
	db *gorm.DB
}

func NewIndustryRepository(db *gorm.DB) IndustryRepository {
	return &industryRepo{db}
}

func (r *industryRepo) Create(ctx context.Context, industry *models.Industry) error {
	return r.db.WithContext(ctx).Create(industry).Error
}

func (r *industryRepo) FindAll(ctx context.Context) ([]models.Industry, error) {
	var industries []models.Industry
	if err := r.db.WithContext(ctx).Find(&industries).Error; err != nil {
		return nil, err
	}
	return industries, nil
}
