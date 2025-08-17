package icp

import (
	"time"

	"gorm.io/gorm"
)

type ICPProfile struct {
	ID               uint      `gorm:"primaryKey" json:"id"`
	UserId           uint      `json:"user_id"`
	BusinessType     int       `json:"business_type"`
	Industry         string    `json:"industry"`
	CompanySize      int       `json:"company_size"`
	BuyerRoles       int       `json:"buyer_roles"`
	ProblemStatement string    `json:"problem_statement"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

func (p *ICPProfile) BeforeCreate(tx *gorm.DB) error {
	now := time.Now()
	p.CreatedAt = now
	p.UpdatedAt = now
	return nil
}

// BeforeUpdate hook to update UpdatedAt
func (p *ICPProfile) BeforeUpdate(tx *gorm.DB) error {
	p.UpdatedAt = time.Now()
	return nil
}
