package icp

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// CreateICPHandler godoc
// @Summary Create a new ICP profile
// @Description Creates a new Ideal Customer Profile for a given user
// @Tags ICP
// @Accept json
// @Produce json
// @Param profile body ICPProfile true "ICP Profile Data"
// @Success 201 {object} ICPProfile
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /icp [post]
func (h *Handler) CreateICPHandler(c *gin.Context) {
	var profile ICPProfile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if err := h.service.CreateICP(&profile); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create ICP"})
		return
	}

	c.JSON(http.StatusCreated, profile)
}

// GetICPByIDHandler godoc
// @Summary Get an ICP profile by ID
// @Description Fetches an ICP profile using its unique ID
// @Tags ICP
// @Accept json
// @Produce json
// @Param id path int true "ICP ID"
// @Success 200 {object} ICPProfile
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /icp/{id} [get]
func (h *Handler) GetICPByIDHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	profile, err := h.service.GetICPByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ICP not found"})
		return
	}

	c.JSON(http.StatusOK, profile)
}

// ListICPsByUserHandler godoc
// @Summary List all ICP profiles for a user
// @Description Retrieves all ICP profiles associated with a given user ID
// @Tags ICP
// @Accept json
// @Produce json
// @Param user_id path int true "User ID"
// @Success 200 {array} ICPProfile
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /icp/user/{user_id} [get]
func (h *Handler) ListICPsByUserHandler(c *gin.Context) {
	// userIDStr := c.Param("user_id")
	// userID, err := strconv.ParseUint(userIDStr, 10, 32)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
	// 	return
	// }

	profiles, err := h.service.ListICPsByUser(0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch ICPs"})
		return
	}

	c.JSON(http.StatusOK, profiles)
}

// UpdateICPHandler godoc
// @Summary Update an ICP profile
// @Description Updates an existing ICP profile by ID
// @Tags ICP
// @Accept json
// @Produce json
// @Param id path int true "ICP ID"
// @Param profile body ICPProfile true "Updated ICP Profile Data"
// @Success 200 {object} ICPProfile
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /icp/{id} [put]
func (h *Handler) UpdateICPHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var profile ICPProfile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	profile.ID = uint(id)
	if err := h.service.UpdateICP(&profile); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update ICP"})
		return
	}

	c.JSON(http.StatusOK, profile)
}

// DeleteICPHandler godoc
// @Summary Delete an ICP profile
// @Description Deletes an ICP profile by ID
// @Tags ICP
// @Accept json
// @Produce json
// @Param id path int true "ICP ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /icp/{id} [delete]
func (h *Handler) DeleteICPHandler(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := h.service.DeleteICP(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete ICP"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ICP deleted successfully"})
}
