// internal/company/service/location_service.go
package service

import (
	"context"
	"errors"

	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
)

type LocationService interface {
	AddLocationToCompany(ctx context.Context, companyID uint, loc *model.Location) error
	GetLocationsByCompany(ctx context.Context, companyID uint) ([]model.Location, error)
	// optional helper
	ReplaceLocationsForCompany(ctx context.Context, companyID uint, locations []model.Location) error
}

type locationService struct {
	repo        repositories.LocationRepository
	companyRepo repositories.CompanyRepository
}

func NewLocationService(repo repositories.LocationRepository, companyRepo repositories.CompanyRepository) LocationService {
	return &locationService{repo: repo, companyRepo: companyRepo}
}

func (s *locationService) AddLocationToCompany(ctx context.Context, companyID uint, loc *model.Location) error {
	if loc == nil {
		return errors.New("location is nil")
	}
	// ensure company exists
	if _, err := s.companyRepo.FindByID(ctx, companyID); err != nil {
		return err
	}
	loc.CompanyID = companyID
	return s.repo.Create(ctx, loc)
}

func (s *locationService) GetLocationsByCompany(ctx context.Context, companyID uint) ([]model.Location, error) {
	return s.repo.FindByCompanyID(ctx, companyID)
}

// ReplaceLocationsForCompany replaces existing locations for a company with the provided slice.
// Implementation strategy: delete existing locations for the company, then bulk-insert new ones inside a repo transaction.
// This method requires repo support for transactional deletes/inserts or a Replace method on the repo.
func (s *locationService) ReplaceLocationsForCompany(ctx context.Context, companyID uint, locations []model.Location) error {
	// ensure company exists
	if _, err := s.companyRepo.FindByID(ctx, companyID); err != nil {
		return err
	}

	// set companyID on each location
	for i := range locations {
		locations[i].CompanyID = companyID
	}

	// If repo has a ReplaceForCompany or Transaction helper, call that.
	// Otherwise, do delete + bulk create via repo methods (repo must support them).
	if replacer, ok := s.repo.(interface {
		ReplaceForCompany(ctx context.Context, companyID uint, locs []model.Location) error
	}); ok {
		return replacer.ReplaceForCompany(ctx, companyID, locations)
	}

	// Fallback: delete existing then create new (assumes repo provides DeleteByCompanyID and CreateBulk)
	if deleter, ok := s.repo.(interface {
		DeleteByCompanyID(ctx context.Context, companyID uint) error
	}); ok {
		if err := deleter.DeleteByCompanyID(ctx, companyID); err != nil {
			return err
		}
	}
	if batcher, ok := s.repo.(interface {
		CreateBulk(ctx context.Context, locs []model.Location, batchSize int) error
	}); ok {
		return batcher.CreateBulk(ctx, locations, 100)
	}

	// If neither Replace nor Delete/Create batch is available, fallback to creating individually
	for i := range locations {
		if err := s.repo.Create(ctx, &locations[i]); err != nil {
			return err
		}
	}
	return nil
}
