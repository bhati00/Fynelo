package icp

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

// CreateICP creates a new ICP profile
func (s *Service) CreateICP(profile *ICPProfile) error {
	return s.repo.CreateICP(profile)
}

// GetICPByID retrieves a specific ICP profile by ID
func (s *Service) GetICPByID(id uint) (*ICPProfile, error) {
	return s.repo.GetICPByID(id)
}

// ListICPsByUser retrieves all ICP profiles for a specific user
func (s *Service) ListICPsByUser(userID uint) ([]ICPProfile, error) {
	return s.repo.ListICPsByUser(userID)
}

// UpdateICP updates an existing ICP profile
func (s *Service) UpdateICP(profile *ICPProfile) error {
	return s.repo.UpdateICP(profile)
}

// DeleteICP deletes an ICP profile by ID
func (s *Service) DeleteICP(id uint) error {
	return s.repo.DeleteICP(id)
}
