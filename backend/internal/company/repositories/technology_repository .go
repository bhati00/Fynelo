// backend/internal/company/technology_repo.go
package repositories

import (
	"context"

	. "github.com/bhati00/Fynelo/backend/internal/company/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type TechnologyRepository interface {
	// writes
	Create(ctx context.Context, t *Technology) error
	CreateBulk(ctx context.Context, techs []Technology, batchSize int) error
	Upsert(ctx context.Context, t *Technology) error
	ReplaceForCompany(ctx context.Context, companyID uint, names []string) error

	// reads
	FindByID(ctx context.Context, id uint) (*Technology, error)
	FindByCompanyID(ctx context.Context, companyID uint) ([]Technology, error)
	FindByCompanyAndName(ctx context.Context, companyID uint, name string) (*Technology, error)
	ListDistinctNames(ctx context.Context, limit, offset int) ([]string, error)
	SearchNames(ctx context.Context, query string, limit int) ([]string, error)
	CountByCompanyID(ctx context.Context, companyID uint) (int64, error)

	// deletes
	DeleteByID(ctx context.Context, id uint) error
	DeleteByCompanyID(ctx context.Context, companyID uint) error
	DeleteByCompanyAndName(ctx context.Context, companyID uint, name string) error
}

type technologyRepo struct {
	db *gorm.DB
}

func NewTechnologyRepository(db *gorm.DB) TechnologyRepository {
	return &technologyRepo{db: db}
}

func (r *technologyRepo) Create(ctx context.Context, t *Technology) error {
	return r.db.WithContext(ctx).Create(t).Error
}

func (r *technologyRepo) CreateBulk(ctx context.Context, techs []Technology, batchSize int) error {
	if len(techs) == 0 {
		return nil
	}
	if batchSize <= 0 {
		batchSize = 200
	}
	return r.db.WithContext(ctx).CreateInBatches(&techs, batchSize).Error
}

// Upsert on (company_id, technology_name). Requires a composite unique index
// or we specify the columns explicitly in the clause.
func (r *technologyRepo) Upsert(ctx context.Context, t *Technology) error {
	return r.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "company_id"}, {Name: "technology_name"}},
		DoUpdates: clause.AssignmentColumns([]string{"updated_at"}),
	}).Create(t).Error
}

func (r *technologyRepo) FindByID(ctx context.Context, id uint) (*Technology, error) {
	var t Technology
	if err := r.db.WithContext(ctx).First(&t, id).Error; err != nil {
		return nil, err
	}
	return &t, nil
}

func (r *technologyRepo) FindByCompanyID(ctx context.Context, companyID uint) ([]Technology, error) {
	var list []Technology
	if err := r.db.WithContext(ctx).
		Where("company_id = ?", companyID).
		Order("technology_name ASC").
		Find(&list).Error; err != nil {
		return nil, err
	}
	return list, nil
}

func (r *technologyRepo) FindByCompanyAndName(ctx context.Context, companyID uint, name string) (*Technology, error) {
	var t Technology
	if err := r.db.WithContext(ctx).
		Where("company_id = ? AND technology_name = ?", companyID, name).
		First(&t).Error; err != nil {
		return nil, err
	}
	return &t, nil
}

// ListDistinctNames returns distinct technology names across all companies (for autosuggest/tagging).
func (r *technologyRepo) ListDistinctNames(ctx context.Context, limit, offset int) ([]string, error) {
	var names []string
	tx := r.db.WithContext(ctx).
		Model(&Technology{}).
		Distinct().
		Order("technology_name ASC").
		Offset(offset)
	if limit > 0 {
		tx = tx.Limit(limit)
	}
	if err := tx.Pluck("technology_name", &names).Error; err != nil {
		return nil, err
	}
	return names, nil
}

// SearchNames does a partial match on technology_name.
// NOTE: `ILIKE` is Postgres-specific; change to `LIKE` for MySQL/SQLite.
func (r *technologyRepo) SearchNames(ctx context.Context, query string, limit int) ([]string, error) {
	var names []string
	tx := r.db.WithContext(ctx).
		Model(&Technology{}).
		Where("technology_name ILIKE ?", "%"+query+"%").
		Order("technology_name ASC")
	if limit > 0 {
		tx = tx.Limit(limit)
	}
	if err := tx.Pluck("technology_name", &names).Error; err != nil {
		return nil, err
	}
	return names, nil
}

// ReplaceForCompany performs a "sync":
// - deletes technologies not in the new set
// - upserts any new ones
func (r *technologyRepo) ReplaceForCompany(ctx context.Context, companyID uint, names []string) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		// existing
		var existing []Technology
		if err := tx.Where("company_id = ?", companyID).Find(&existing).Error; err != nil {
			return err
		}

		// build sets
		want := map[string]struct{}{}
		for _, n := range names {
			if n == "" {
				continue
			}
			want[n] = struct{}{}
		}
		// compute deletions
		var toDelete []string
		for _, t := range existing {
			if _, keep := want[t.TechnologyName]; !keep {
				toDelete = append(toDelete, t.TechnologyName)
			}
		}
		if len(toDelete) > 0 {
			if err := tx.
				Where("company_id = ? AND technology_name IN ?", companyID, toDelete).
				Delete(&Technology{}).Error; err != nil {
				return err
			}
		}
		// upsert additions
		if len(want) > 0 {
			rows := make([]Technology, 0, len(want))
			for n := range want {
				rows = append(rows, Technology{
					CompanyID:      companyID,
					TechnologyName: n,
				})
			}
			if err := tx.Clauses(clause.OnConflict{
				Columns:   []clause.Column{{Name: "company_id"}, {Name: "technology_name"}},
				DoNothing: true,
			}).Create(&rows).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *technologyRepo) DeleteByID(ctx context.Context, id uint) error {
	return r.db.WithContext(ctx).Delete(&Technology{}, id).Error
}

func (r *technologyRepo) DeleteByCompanyID(ctx context.Context, companyID uint) error {
	return r.db.WithContext(ctx).Where("company_id = ?", companyID).Delete(&Technology{}).Error
}

func (r *technologyRepo) DeleteByCompanyAndName(ctx context.Context, companyID uint, name string) error {
	return r.db.WithContext(ctx).
		Where("company_id = ? AND technology_name = ?", companyID, name).
		Delete(&Technology{}).Error
}

func (r *technologyRepo) CountByCompanyID(ctx context.Context, companyID uint) (int64, error) {
	var count int64
	if err := r.db.WithContext(ctx).
		Model(&Technology{}).
		Where("company_id = ?", companyID).
		Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}
