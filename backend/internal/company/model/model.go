package model

// backend/internal/company/model.go
import (
	"time"

	"gorm.io/gorm"
)

type CompanyStatus string

const (
	StatusActive   CompanyStatus = "active"
	StatusClosed   CompanyStatus = "closed"
	StatusAcquired CompanyStatus = "acquired"
	StatusIPO      CompanyStatus = "ipo"
	StatusPrivate  CompanyStatus = "private"
)

type FundingRoundType string

const (
	RoundSeed        FundingRoundType = "seed"
	RoundSeriesA     FundingRoundType = "series_a"
	RoundSeriesB     FundingRoundType = "series_b"
	RoundSeriesC     FundingRoundType = "series_c"
	RoundSeriesD     FundingRoundType = "series_d"
	RoundIPO         FundingRoundType = "ipo"
	RoundAcquisition FundingRoundType = "acquisition"
)

// Company represents the main company entity
type Company struct {
	ID             uint           `gorm:"primaryKey" json:"id"`
	Name           string         `gorm:"not null;index" json:"name"`
	Website        *string        `json:"website"`
	HQLocation     *string        `json:"hq_location"`
	IndustryID     *uint          `json:"industry_id"`
	Industry       *Industry      `gorm:"foreignKey:IndustryID" json:"industry,omitempty"`
	EmployeeRange  *string        `json:"employee_range"`
	FoundedYear    *int           `json:"founded_year"`
	Status         CompanyStatus  `gorm:"type:varchar(20);default:'active'" json:"status"`
	Source         string         `gorm:"type:varchar(50)" json:"source"` // "manual", "scraped", "api"
	LastEnrichedAt *time.Time     `json:"last_enriched_at"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`

	// Relationships
	Revenues      []Revenue      `gorm:"foreignKey:CompanyID" json:"revenues,omitempty"`
	FundingRounds []FundingRound `gorm:"foreignKey:CompanyID" json:"funding_rounds,omitempty"`
	Technologies  []Technology   `gorm:"foreignKey:CompanyID" json:"technologies,omitempty"`
	Locations     []Location     `gorm:"foreignKey:CompanyID" json:"locations,omitempty"`
}

// Industry represents company industries
type Industry struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `gorm:"not null;unique" json:"name"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	// Relationships
	Companies []Company `gorm:"foreignKey:IndustryID" json:"companies,omitempty"`
}

// Revenue represents company revenue data
type Revenue struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CompanyID uint           `gorm:"not null;index" json:"company_id"`
	Company   Company        `gorm:"foreignKey:CompanyID" json:"company,omitempty"`
	Currency  string         `gorm:"type:varchar(3);not null" json:"currency"` // USD, EUR, etc.
	Amount    float64        `gorm:"not null" json:"amount"`
	Year      int            `gorm:"not null" json:"year"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// FundingRound represents company funding information
type FundingRound struct {
	ID        uint             `gorm:"primaryKey" json:"id"`
	CompanyID uint             `gorm:"not null;index" json:"company_id"`
	Company   Company          `gorm:"foreignKey:CompanyID" json:"company,omitempty"`
	RoundType FundingRoundType `gorm:"type:varchar(20);not null" json:"round_type"`
	Amount    *float64         `json:"amount"` // nullable for undisclosed amounts
	Currency  string           `gorm:"type:varchar(3);default:'USD'" json:"currency"`
	Date      *time.Time       `json:"date"`
	Investors string           `gorm:"type:text" json:"investors"` // JSON string or comma-separated
	CreatedAt time.Time        `json:"created_at"`
	UpdatedAt time.Time        `json:"updated_at"`
	DeletedAt gorm.DeletedAt   `gorm:"index" json:"-"`
}

// Technology represents technologies used by companies
type Technology struct {
	ID             uint           `gorm:"primaryKey" json:"id"`
	CompanyID      uint           `gorm:"not null;index" json:"company_id"`
	Company        Company        `gorm:"foreignKey:CompanyID" json:"company,omitempty"`
	TechnologyName string         `gorm:"not null" json:"technology_name"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// Location represents company locations
type Location struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	CompanyID  uint           `gorm:"not null;index" json:"company_id"`
	Company    Company        `gorm:"foreignKey:CompanyID" json:"company,omitempty"`
	Address    *string        `json:"address"`
	City       *string        `json:"city"`
	State      *string        `json:"state"`
	Country    *string        `json:"country"`
	PostalCode *string        `json:"postal_code"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

// TableName methods for custom table names if needed
func (Company) TableName() string {
	return "companies"
}

func (Industry) TableName() string {
	return "industries"
}

func (Revenue) TableName() string {
	return "revenues"
}

func (FundingRound) TableName() string {
	return "funding_rounds"
}

func (Technology) TableName() string {
	return "technologies"
}

func (Location) TableName() string {
	return "locations"
}
