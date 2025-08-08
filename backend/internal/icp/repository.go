package icp

import (
	"errors"

	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

// Create a new ICPProfile
func (r *Repository) CreateICP(profile *ICPProfile) error {
	return r.db.Create(profile).Error
}

// Get a single ICPProfile by ID
func (r *Repository) GetICPByID(id uint) (*ICPProfile, error) {
	var profile ICPProfile
	if err := r.db.First(&profile, id).Error; err != nil {
		return nil, err
	}
	return &profile, nil
}

// Get all ICPProfiles for a user
func (r *Repository) ListICPsByUser(userID uint) ([]ICPProfile, error) {
	var profiles []ICPProfile
	if err := r.db.Where("user_id = ?", userID).Find(&profiles).Error; err != nil {
		return nil, err
	}
	return profiles, nil
}

// Update an existing ICPProfile
func (r *Repository) UpdateICP(profile *ICPProfile) error {
	if profile.ID == 0 {
		return errors.New("profile ID must be set")
	}
	return r.db.Save(profile).Error
}

// Delete an ICPProfile
func (r *Repository) DeleteICP(id uint) error {
	return r.db.Delete(&ICPProfile{}, id).Error
}
