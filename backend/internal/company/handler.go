package company

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/bhati00/Fynelo/backend/internal/company/service"
)

type Handler struct {
	companyService service.CompanyService
}

func NewHandler(companyService service.CompanyService) *Handler {
	return &Handler{
		companyService: companyService,
	}
}

// SearchCompaniesHandler godoc
// @Summary Search companies
// @Description Search companies with various filters
// @Tags Companies
// @Accept json
// @Produce json
// @Param q query string false "Search query (company name, website)"
// @Param industry query string false "Industry filter (e.g., technology, fintech)"
// @Param employee_size query string false "Employee size range (e.g., 1-10, 11-50)"
// @Param location query string false "Location filter"
// @Param funding_stage query string false "Funding stage (seed, series_a, etc.)"
// @Param founded_min query int false "Founded after year"
// @Param founded_max query int false "Founded before year"
// @Param status query string false "Company status (active, closed, etc.)"
// @Param limit query int false "Results limit (default: 20, max: 100)"
// @Param offset query int false "Results offset (default: 0)"
// @Success 200 {object} service.CompanySearchResponse
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /companies/search [get]
func (h *Handler) SearchCompaniesHandler(c *gin.Context) {
	var req service.CompanySearchRequest
	
	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid query parameters"})
		return
	}
	
	response, err := h.companyService.SearchCompanies(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search companies"})
		return
	}
	
	c.JSON(http.StatusOK, response)
}

// GetCompanyHandler godoc
// @Summary Get company by ID
// @Description Get a company by its ID
// @Tags Companies
// @Accept json
// @Produce json
// @Param id path int true "Company ID"
// @Success 200 {object} model.Company
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /companies/{id} [get]
func (h *Handler) GetCompanyHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid company ID"})
		return
	}
	
	company, err := h.companyService.GetCompanyByID(c.Request.Context(), uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Company not found"})
		return
	}
	
	c.JSON(http.StatusOK, company)
}

// ListCompaniesHandler godoc
// @Summary List companies
// @Description List companies with pagination
// @Tags Companies
// @Accept json
// @Produce json
// @Param limit query int false "Results limit (default: 20)"
// @Param offset query int false "Results offset (default: 0)"
// @Success 200 {array} model.Company
// @Failure 500 {object} map[string]string
// @Router /companies [get]
func (h *Handler) ListCompaniesHandler(c *gin.Context) {
	limit := 20
	offset := 0
	
	if l := c.Query("limit"); l != "" {
		if parsed, err := strconv.Atoi(l); err == nil && parsed > 0 {
			limit = parsed
			if limit > 100 {
				limit = 100
			}
		}
	}
	
	if o := c.Query("offset"); o != "" {
		if parsed, err := strconv.Atoi(o); err == nil && parsed >= 0 {
			offset = parsed
		}
	}
	
	companies, err := h.companyService.ListCompanies(c.Request.Context(), limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch companies"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"companies": companies,
		"limit":     limit,
		"offset":    offset,
	})
}