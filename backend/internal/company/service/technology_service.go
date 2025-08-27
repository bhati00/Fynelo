package service

import (
	"context"
	"errors"

	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
)

type TechnologyService interface {
	AddTechnologyToCompany(ctx context.Context, companyID uint, t *model.Technology) error
	GetTechnologiesByCompany(ctx context.Context, companyID uint) ([]model.Technology, error)
	DeleteTechnology(ctx context.Context, id uint) error
	ReplaceTechnologiesForCompany(ctx context.Context, companyID uint, names []string) error
}

type technologyService struct {
	repo        repositories.TechnologyRepository
	companyRepo repositories.CompanyRepository
}

func NewTechnologyService(repo repositories.TechnologyRepository, companyRepo repositories.CompanyRepository) TechnologyService {
	return &technologyService{repo: repo, companyRepo: companyRepo}
}

func (s *technologyService) AddTechnologyToCompany(ctx context.Context, companyID uint, t *model.Technology) error {
	if t == nil || t.TechnologyName == "" {
		return errors.New("invalid technology")
	}
	// validate company exists
	if _, err := s.companyRepo.FindByID(ctx, companyID); err != nil {
		return err
	}
	t.CompanyID = companyID
	return s.repo.Create(ctx, t)
}

func (s *technologyService) GetTechnologiesByCompany(ctx context.Context, companyID uint) ([]model.Technology, error) {
	return s.repo.FindByCompanyID(ctx, companyID)
}

func (s *technologyService) DeleteTechnology(ctx context.Context, id uint) error {
	return s.repo.DeleteByID(ctx, id)
}

func (s *technologyService) ReplaceTechnologiesForCompany(ctx context.Context, companyID uint, names []string) error {
	// ensure company exists
	if _, err := s.companyRepo.FindByID(ctx, companyID); err != nil {
		return err
	}
	return s.repo.ReplaceForCompany(ctx, companyID, names)
}
