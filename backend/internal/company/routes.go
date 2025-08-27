package company

import "github.com/gin-gonic/gin"

func RegisterCompanyRoutes(rg *gin.RouterGroup, h *Handler) {
	companies := rg.Group("/companies")
	{
		companies.GET("/search", h.SearchCompaniesHandler)
		companies.GET("/:id", h.GetCompanyHandler)
		companies.GET("", h.ListCompaniesHandler)
	}
}