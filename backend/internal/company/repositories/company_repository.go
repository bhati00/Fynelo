package repositories

import (
	"context"

	models "github.com/bhati00/Fynelo/backend/internal/company/model"

	"gorm.io/gorm"
)

type CompanySearchParams struct {
	Query        string  // Company name, website search
	IndustryID   *int    // Industry filter
	EmployeeSizeID *int  // Employee size filter  
	Location     string  // Location filter
	FundingStage string  // Funding stage filter
	FoundedMin   *int    // Founded after year
	FoundedMax   *int    // Founded before year
	Status       string  // Company status
	Limit        int     // Pagination limit
	Offset       int     // Pagination offset
}

type CompanyRepository interface {
	Create(ctx context.Context, company *models.Company) error
	Update(ctx context.Context, company *models.Company) error
	FindByID(ctx context.Context, id uint) (*models.Company, error)
	FindByName(ctx context.Context, name string) (*models.Company, error)
	Delete(ctx context.Context, id uint) error
	List(ctx context.Context, limit, offset int) ([]models.Company, error)
	// New search methods
	Search(ctx context.Context, params CompanySearchParams) ([]models.Company, error)
	SearchCount(ctx context.Context, params CompanySearchParams) (int64, error)
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

func (r *companyRepo) Search(ctx context.Context, params CompanySearchParams) ([]models.Company, error) {
	var companies []models.Company
	query := r.buildSearchQuery(params)
	
	if err := query.WithContext(ctx).Limit(params.Limit).Offset(params.Offset).Find(&companies).Error; err != nil {
		return nil, err
	}
	return companies, nil
}

func (r *companyRepo) SearchCount(ctx context.Context, params CompanySearchParams) (int64, error) {
	var count int64
	query := r.buildSearchQuery(params)
	
	if err := query.WithContext(ctx).Model(&models.Company{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}

func (r *companyRepo) buildSearchQuery(params CompanySearchParams) *gorm.DB {
	query := r.db.Model(&models.Company{})
	
	// Text search on name and website
	if params.Query != "" {
		query = query.Where("name ILIKE ? OR website ILIKE ?", "%"+params.Query+"%", "%"+params.Query+"%")
	}
	
	// Industry filter
	if params.IndustryID != nil {
		query = query.Where("industry_id = ?", *params.IndustryID)
	}
	
	// Employee size filter
	if params.EmployeeSizeID != nil {
		query = query.Where("employee_size_id = ?", *params.EmployeeSizeID)
	}
	
	// Location filter (search in HQ location)
	if params.Location != "" {
		query = query.Where("hq_location ILIKE ?", "%"+params.Location+"%")
	}
	
	// Founded year filters
	if params.FoundedMin != nil {
		query = query.Where("founded_year >= ?", *params.FoundedMin)
	}
	if params.FoundedMax != nil {
		query = query.Where("founded_year <= ?", *params.FoundedMax)
	}
	
	// Status filter
	if params.Status != "" {
		query = query.Where("status = ?", params.Status)
	}
	
	// Funding stage filter (requires join with funding_rounds table)
	if params.FundingStage != "" {
		query = query.Joins("LEFT JOIN funding_rounds ON funding_rounds.company_id = companies.id").
			Where("funding_rounds.round_type = ?", params.FundingStage).
			Distinct()
	}
	
	return query
}
