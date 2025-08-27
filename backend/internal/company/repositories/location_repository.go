package repositories

import (
	"context"

	models "github.com/bhati00/Fynelo/backend/internal/company/model"
	"gorm.io/gorm"
)

type LocationRepository interface {
	Create(ctx context.Context, location *models.Location) error
	FindByCompanyID(ctx context.Context, companyID uint) ([]models.Location, error)
}

type locationRepo struct {
	db *gorm.DB
}

func NewLocationRepository(db *gorm.DB) LocationRepository {
	return &locationRepo{db}
}

func (r *locationRepo) Create(ctx context.Context, location *models.Location) error {
	return r.db.WithContext(ctx).Create(location).Error
}

func (r *locationRepo) FindByCompanyID(ctx context.Context, companyID uint) ([]models.Location, error) {
	var locations []models.Location
	if err := r.db.WithContext(ctx).Where("company_id = ?", companyID).Find(&locations).Error; err != nil {
		return nil, err
	}
	return locations, nil
}
