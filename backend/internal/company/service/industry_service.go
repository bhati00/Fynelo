package service

import (
	"context"
	"errors"

	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
)

type IndustryService interface {
	CreateIndustry(ctx context.Context, ind *model.Industry) error

	// assign an existing industry to a company (updates company's IndustryID)
	AssignIndustryToCompany(ctx context.Context, companyID, industryID uint) error
}

type industryService struct {
	repo        repositories.IndustryRepository
	companyRepo repositories.CompanyRepository
}

func NewIndustryService(repo repositories.IndustryRepository, companyRepo repositories.CompanyRepository) IndustryService {
	return &industryService{repo: repo, companyRepo: companyRepo}
}

func (s *industryService) CreateIndustry(ctx context.Context, ind *model.Industry) error {
	if ind == nil || ind.Name == "" {
		return errors.New("invalid industry")
	}
	return s.repo.Create(ctx, ind)
}

func (s *industryService) AssignIndustryToCompany(ctx context.Context, companyID, industryID uint) error {
	company, err := s.companyRepo.FindByID(ctx, companyID)
	if err != nil {
		return err
	}
	company.IndustryID = &industryID
	return s.companyRepo.Update(ctx, company)
}
