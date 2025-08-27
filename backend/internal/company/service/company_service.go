package service

import (
	"context"
	"errors"
	"strings"

	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
	"github.com/bhati00/Fynelo/backend/internal/constants"
)

type CompanySearchRequest struct {
	Query        string `form:"q"`
	Industry     string `form:"industry"`
	EmployeeSize string `form:"employee_size"`
	Location     string `form:"location"`
	FundingStage string `form:"funding_stage"`
	FoundedMin   *int   `form:"founded_min"`
	FoundedMax   *int   `form:"founded_max"`
	Status       string `form:"status"`
	Limit        int    `form:"limit"`
	Offset       int    `form:"offset"`
}

type CompanySearchResponse struct {
	Companies []model.Company `json:"companies"`
	Total     int64           `json:"total"`
	HasMore   bool            `json:"has_more"`
	Limit     int             `json:"limit"`
	Offset    int             `json:"offset"`
}

type CompanyService interface {
	CreateCompany(ctx context.Context, c *model.Company) error
	GetCompanyByID(ctx context.Context, id uint) (*model.Company, error)
	GetCompanyWithDetails(ctx context.Context, id uint) (*model.Company, error) // preloads related entities
	ListCompanies(ctx context.Context, limit, offset int) ([]model.Company, error)
	UpdateCompany(ctx context.Context, c *model.Company) error
	DeleteCompany(ctx context.Context, id uint) error
	// New search method
	SearchCompanies(ctx context.Context, req CompanySearchRequest) (*CompanySearchResponse, error)
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

func (s *companyService) SearchCompanies(ctx context.Context, req CompanySearchRequest) (*CompanySearchResponse, error) {
	// Set default pagination
	if req.Limit <= 0 {
		req.Limit = 20
	}
	if req.Limit > 100 {
		req.Limit = 100 // Max limit
	}
	
	// Convert search request to repository params
	params := repositories.CompanySearchParams{
		Query:      req.Query,
		Location:   req.Location,
		FundingStage: req.FundingStage,
		FoundedMin: req.FoundedMin,
		FoundedMax: req.FoundedMax,
		Status:     req.Status,
		Limit:      req.Limit,
		Offset:     req.Offset,
	}
	
	// Convert industry name to ID
	if req.Industry != "" {
		industryID := constants.GetIndustryID(strings.ToLower(req.Industry))
		if industryID != constants.IndustryOther || strings.ToLower(req.Industry) == "other" {
			params.IndustryID = &industryID
		}
	}
	
	// Convert employee size to ID
	if req.EmployeeSize != "" {
		sizeID := constants.GetCompanySizeID(req.EmployeeSize)
		params.EmployeeSizeID = &sizeID
	}
	
	// Get companies and total count
	companies, err := s.repo.Search(ctx, params)
	if err != nil {
		return nil, err
	}
	
	total, err := s.repo.SearchCount(ctx, params)
	if err != nil {
		return nil, err
	}
	
	// Check if there are more results
	hasMore := int64(req.Offset+req.Limit) < total
	
	return &CompanySearchResponse{
		Companies: companies,
		Total:     total,
		HasMore:   hasMore,
		Limit:     req.Limit,
		Offset:    req.Offset,
	}, nil
}
