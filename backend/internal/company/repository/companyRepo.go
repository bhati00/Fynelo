package company

import (
	"gorm.io/gorm"
)

type CompanyRepository struct {
	db *gorm.DB
}

func NewCompanyRepository(db *gorm.DB) *CompanyRepository {
	return &CompanyRepository{db: db}
}

func (r *CompanyRepository) Create(company *Company) error {
	return r.db.Create(company).Error
}

func (r *CompanyRepository) FindByID(id uint) (*Company, error) {
	var company Company
	err := r.db.Preload("Revenues").Preload("FundingRounds").Preload("Technologies").Preload("Locations").
		First(&company, id).Error
	return &company, err
}

func (r *CompanyRepository) FindByName(name string) (*Company, error) {
	var company Company
	err := r.db.Where("name = ?", name).First(&company).Error
	return &company, err
}
