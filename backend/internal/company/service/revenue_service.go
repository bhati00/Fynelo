package service

import (
	"context"
	"errors"

	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
)

type RevenueService interface {
	AddRevenueToCompany(ctx context.Context, companyID uint, r *model.Revenue) error
	GetRevenuesByCompany(ctx context.Context, companyID uint) ([]model.Revenue, error)
}

type revenueService struct {
	repo        repositories.RevenueRepository
	companyRepo repositories.CompanyRepository
}

func NewRevenueService(repo repositories.RevenueRepository, companyRepo repositories.CompanyRepository) RevenueService {
	return &revenueService{repo: repo, companyRepo: companyRepo}
}

func (s *revenueService) AddRevenueToCompany(ctx context.Context, companyID uint, r *model.Revenue) error {
	if r == nil {
		return errors.New("revenue is nil")
	}
	// validate company exists
	if _, err := s.companyRepo.FindByID(ctx, companyID); err != nil {
		return err
	}
	r.CompanyID = companyID
	return s.repo.Create(ctx, r)
}

func (s *revenueService) GetRevenuesByCompany(ctx context.Context, companyID uint) ([]model.Revenue, error) {
	return s.repo.FindByCompanyID(ctx, companyID)
}
