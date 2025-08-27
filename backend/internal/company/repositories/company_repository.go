package repositories

import (
	"context"

	models "github.com/bhati00/Fynelo/backend/internal/company/model"

	"gorm.io/gorm"
)

type CompanyRepository interface {
	Create(ctx context.Context, company *models.Company) error
	Update(ctx context.Context, company *models.Company) error
	FindByID(ctx context.Context, id uint) (*models.Company, error)
	FindByName(ctx context.Context, name string) (*models.Company, error)
	Delete(ctx context.Context, id uint) error
	List(ctx context.Context, limit, offset int) ([]models.Company, error)
}

type companyRepo struct {
	db *gorm.DB
}

func NewCompanyRepository(db *gorm.DB) CompanyRepository {
	return &companyRepo{db}
}

func (r *companyRepo) Create(ctx context.Context, company *models.Company) error {
	return r.db.WithContext(ctx).Create(company).Error
}

func (r *companyRepo) Update(ctx context.Context, company *models.Company) error {
	return r.db.WithContext(ctx).Save(company).Error
}

func (r *companyRepo) FindByID(ctx context.Context, id uint) (*models.Company, error) {
	var c models.Company
	if err := r.db.WithContext(ctx).First(&c, id).Error; err != nil {
		return nil, err
	}
	return &c, nil
}

func (r *companyRepo) FindByName(ctx context.Context, name string) (*models.Company, error) {
	var c models.Company
	if err := r.db.WithContext(ctx).Where("name = ?", name).First(&c).Error; err != nil {
		return nil, err
	}
	return &c, nil
}

func (r *companyRepo) Delete(ctx context.Context, id uint) error {
	return r.db.WithContext(ctx).Delete(&models.Company{}, id).Error
}

func (r *companyRepo) List(ctx context.Context, limit, offset int) ([]models.Company, error) {
	var companies []models.Company
	if err := r.db.WithContext(ctx).Limit(limit).Offset(offset).Find(&companies).Error; err != nil {
		return nil, err
	}
	return companies, nil
}
