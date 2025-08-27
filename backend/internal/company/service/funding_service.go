package service

import (
	"context"
	"errors"

	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
)

type FundingService interface {
	AddFundingToCompany(ctx context.Context, companyID uint, f *model.FundingRound) error
	GetFundingsByCompany(ctx context.Context, companyID uint) ([]model.FundingRound, error)
}

type fundingService struct {
	repo        repositories.FundingRepository
	companyRepo repositories.CompanyRepository
}

func NewFundingService(repo repositories.FundingRepository, companyRepo repositories.CompanyRepository) FundingService {
	return &fundingService{repo: repo, companyRepo: companyRepo}
}

func (s *fundingService) AddFundingToCompany(ctx context.Context, companyID uint, f *model.FundingRound) error {
	if f == nil {
		return errors.New("funding is nil")
	}
	// validate company exists
	if _, err := s.companyRepo.FindByID(ctx, companyID); err != nil {
		return err
	}
	f.CompanyID = companyID
	return s.repo.Create(ctx, f)
}

func (s *fundingService) GetFundingsByCompany(ctx context.Context, companyID uint) ([]model.FundingRound, error) {
	return s.repo.FindByCompanyID(ctx, companyID)
}
