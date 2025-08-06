package icp

import "time"

type ICPProfile struct {
	ID               uint      `gorm:"primaryKey" json:"id"`
	BusinessType     string    `json:"business_type"`
	Industry         string    `json:"industry"`
	CompanySize      string    `json:"company_size"`
	BuyerRoles       string    `json:"buyer_roles"`
	ProblemStatement string    `json:"problem_statement"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}
