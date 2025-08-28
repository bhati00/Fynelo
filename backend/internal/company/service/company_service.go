package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/bhati00/Fynelo/backend/internal/company/model"
	"github.com/bhati00/Fynelo/backend/internal/company/repositories"
	"github.com/bhati00/Fynelo/backend/internal/constants"
	"github.com/bhati00/Fynelo/backend/internal/queue"
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
	Companies   []model.Company `json:"companies"`
	Total       int64           `json:"total"`
	HasMore     bool            `json:"has_more"`
	Limit       int             `json:"limit"`
	Offset      int             `json:"offset"`
	QueuedJobs  []QueuedJob     `json:"queued_jobs,omitempty"`
	SearchTime  string          `json:"search_time"`
}

type QueuedJob struct {
	ID        string `json:"id"`
	Status    string `json:"status"`
	CreatedAt string `json:"created_at"`
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
	repo         repositories.CompanyRepository
	queueService queue.QueueService
}

func NewCompanyService(repo repositories.CompanyRepository, queueService queue.QueueService) CompanyService {
	return &companyService{
		repo:         repo,
		queueService: queueService,
	}
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
	startTime := time.Now()
	
	// Set default pagination
	if req.Limit <= 0 {
		req.Limit = 20
	}
	if req.Limit > 100 {
		req.Limit = 100 // Max limit
	}
	
	// Convert search request to repository params
	params := repositories.CompanySearchParams{
		Query:        req.Query,
		Location:     req.Location,
		FundingStage: req.FundingStage,
		FoundedMin:   req.FoundedMin,
		FoundedMax:   req.FoundedMax,
		Status:       req.Status,
		Limit:        req.Limit,
		Offset:       req.Offset,
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
	
	// Get companies and total count from local DB
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
	searchTime := time.Since(startTime).String()
	
	response := &CompanySearchResponse{
		Companies:  companies,
		Total:      total,
		HasMore:    hasMore,
		Limit:      req.Limit,
		Offset:     req.Offset,
		SearchTime: searchTime,
	}
	
	// Queue for enrichment if results are limited and we have search criteria
	if s.shouldEnqueueForEnrichment(req, total) {
		queuedJob := s.enqueueSearchJob(req)
		if queuedJob != nil {
			response.QueuedJobs = []QueuedJob{*queuedJob}
		}
	}
	
	return response, nil
}

func (s *companyService) shouldEnqueueForEnrichment(req CompanySearchRequest, currentTotal int64) bool {
	// Only queue if we have specific search criteria and limited results
	hasSearchCriteria := req.Query != "" || req.Industry != "" || req.EmployeeSize != "" || 
						req.Location != "" || req.FundingStage != ""
	
	// Queue if we have search criteria and less than 50 results
	return hasSearchCriteria && currentTotal < 50
}

func (s *companyService) enqueueSearchJob(req CompanySearchRequest) *QueuedJob {
	if s.queueService == nil {
		return nil // Queue service not available
	}
	
	// Create search job
	searchJob := &queue.SearchJob{
		Query: req.Query,
		Filters: queue.SearchFilters{
			Industry:     req.Industry,
			EmployeeSize: req.EmployeeSize,
			Location:     req.Location,
			FundingStage: req.FundingStage,
			FoundedMin:   req.FoundedMin,
			FoundedMax:   req.FoundedMax,
			Status:       req.Status,
		},
		Priority: queue.PriorityNormal,
	}
	
	// Enqueue the job
	if err := s.queueService.EnqueueSearch(searchJob); err != nil {
		// Log error but don't fail the search
		// In production, you'd want proper logging here
		return nil
	}
	
	return &QueuedJob{
		ID:        searchJob.ID,
		Status:    string(searchJob.Status),
		CreatedAt: searchJob.CreatedAt.Format(time.RFC3339),
	}
}
