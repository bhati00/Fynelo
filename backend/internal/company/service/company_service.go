package service

import (
	"context"
	"errors"

	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
)

type CompanyService interface {
	CreateCompany(ctx context.Context, c *model.Company) error
	GetCompanyByID(ctx context.Context, id uint) (*model.Company, error)
	GetCompanyWithDetails(ctx context.Context, id uint) (*model.Company, error) // preloads related entities
	ListCompanies(ctx context.Context, limit, offset int) ([]model.Company, error)
	UpdateCompany(ctx context.Context, c *model.Company) error
	DeleteCompany(ctx context.Context, id uint) error
}

type companyService struct {
	repo repositories.CompanyRepository
}

func NewCompanyService(repo repositories.CompanyRepository) CompanyService {
	return &companyService{repo: repo}
}

func (s *companyService) CreateCompany(ctx context.Context, c *model.Company) error {
	if c == nil {
		return errors.New("company is nil")
	}
	if c.Name == "" {
		return errors.New("company name is required")
	}
	return s.repo.Create(ctx, c)
}

func (s *companyService) GetCompanyByID(ctx context.Context, id uint) (*model.Company, error) {
	return s.repo.FindByID(ctx, id)
}

func (s *companyService) GetCompanyWithDetails(ctx context.Context, id uint) (*model.Company, error) {
	// assume repo.FindByID preloads necessary relations; if not, add a dedicated repo method
	return s.repo.FindByID(ctx, id)
}

func (s *companyService) ListCompanies(ctx context.Context, limit, offset int) ([]model.Company, error) {
	return s.repo.List(ctx, limit, offset)
}

func (s *companyService) UpdateCompany(ctx context.Context, c *model.Company) error {
	if c == nil || c.ID == 0 {
		return errors.New("invalid company")
	}
	return s.repo.Update(ctx, c)
}

func (s *companyService) DeleteCompany(ctx context.Context, id uint) error {
	return s.repo.Delete(ctx, id)
}
