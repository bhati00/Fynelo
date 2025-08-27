package constants

// Business Types
const (
	BusinessTypeB2BSaaS       = 1
	BusinessTypeECommerce     = 2
	BusinessTypeConsulting    = 3
	BusinessTypeManufacturing = 4
	BusinessTypeHealthcare    = 5
	BusinessTypeEducation     = 6
	BusinessTypeFinancial     = 7
	BusinessTypeRealEstate    = 8
	BusinessTypeOther         = 9
)

// Industries
const (
	IndustryTechnology     = 1
	IndustryFintech        = 2
	IndustryHealthcare     = 3
	IndustryEducation      = 4
	IndustryECommerce      = 5
	IndustryManufacturing  = 6
	IndustryRealEstate     = 7
	IndustryConsulting     = 8
	IndustryMarketing      = 9
	IndustryRetail         = 10
	IndustryLogistics      = 11
	IndustryEnergy         = 12
	IndustryMedia          = 13
	IndustryGaming         = 14
	IndustryAutomotive     = 15
	IndustryAgriculture    = 16
	IndustryAerospace      = 17
	IndustryTelecom        = 18
	IndustryBiotechnology  = 19
	IndustryCybersecurity  = 20
	IndustryAI             = 21
	IndustryBlockchain     = 22
	IndustryCloudComputing = 23
	IndustryInsurance      = 24
	IndustryBanking        = 25
	IndustryFoodBeverage   = 26
	IndustryTravel         = 27
	IndustryFashion        = 28
	IndustryOther          = 29
)

// Company Sizes (Employee ranges)
const (
	CompanySize1To10     = 1  // "1-10"
	CompanySize11To50    = 2  // "11-50"
	CompanySize51To200   = 3  // "51-200"
	CompanySize201To500  = 4  // "201-500"
	CompanySize501To1000 = 5  // "501-1000"
	CompanySize1000Plus  = 6  // "1000+"
)

// Buyer Roles
const (
	BuyerRoleCEOFounder        = 1
	BuyerRoleCTOVPEngineering  = 2
	BuyerRoleMarketingDirector = 3
	BuyerRoleSalesDirector     = 4
	BuyerRoleOperationsManager = 5
	BuyerRoleHRDirector        = 6
	BuyerRoleFinanceDirector   = 7
	BuyerRoleProductManager    = 8
	BuyerRoleITManager         = 9
	BuyerRoleOther             = 10
)

// Maps for string conversions
var IndustryNames = map[int]string{
	IndustryTechnology:     "Technology",
	IndustryFintech:        "Fintech",
	IndustryHealthcare:     "Healthcare",
	IndustryEducation:      "Education",
	IndustryECommerce:      "E-commerce",
	IndustryManufacturing:  "Manufacturing",
	IndustryRealEstate:     "Real Estate",
	IndustryConsulting:     "Consulting",
	IndustryMarketing:      "Marketing",
	IndustryRetail:         "Retail",
	IndustryLogistics:      "Logistics",
	IndustryEnergy:         "Energy",
	IndustryMedia:          "Media",
	IndustryGaming:         "Gaming",
	IndustryAutomotive:     "Automotive",
	IndustryAgriculture:    "Agriculture",
	IndustryAerospace:      "Aerospace",
	IndustryTelecom:        "Telecom",
	IndustryBiotechnology:  "Biotechnology",
	IndustryCybersecurity:  "Cybersecurity",
	IndustryAI:             "Artificial Intelligence",
	IndustryBlockchain:     "Blockchain",
	IndustryCloudComputing: "Cloud Computing",
	IndustryInsurance:      "Insurance",
	IndustryBanking:        "Banking",
	IndustryFoodBeverage:   "Food & Beverage",
	IndustryTravel:         "Travel",
	IndustryFashion:        "Fashion",
	IndustryOther:          "Other",
}

var IndustryNamesToID = map[string]int{
	"technology":         IndustryTechnology,
	"fintech":           IndustryFintech,
	"healthcare":        IndustryHealthcare,
	"education":         IndustryEducation,
	"e-commerce":        IndustryECommerce,
	"ecommerce":         IndustryECommerce,
	"manufacturing":     IndustryManufacturing,
	"real estate":       IndustryRealEstate,
	"realestate":        IndustryRealEstate,
	"consulting":        IndustryConsulting,
	"marketing":         IndustryMarketing,
	"retail":            IndustryRetail,
	"logistics":         IndustryLogistics,
	"energy":            IndustryEnergy,
	"media":             IndustryMedia,
	"gaming":            IndustryGaming,
	"automotive":        IndustryAutomotive,
	"agriculture":       IndustryAgriculture,
	"aerospace":         IndustryAerospace,
	"telecom":           IndustryTelecom,
	"biotechnology":     IndustryBiotechnology,
	"cybersecurity":     IndustryCybersecurity,
	"ai":                IndustryAI,
	"artificial intelligence": IndustryAI,
	"blockchain":        IndustryBlockchain,
	"cloud computing":   IndustryCloudComputing,
	"cloud":             IndustryCloudComputing,
	"insurance":         IndustryInsurance,
	"banking":           IndustryBanking,
	"food & beverage":   IndustryFoodBeverage,
	"food":              IndustryFoodBeverage,
	"travel":            IndustryTravel,
	"fashion":           IndustryFashion,
	"other":             IndustryOther,
}

var CompanySizeRanges = map[int]string{
	CompanySize1To10:     "1-10",
	CompanySize11To50:    "11-50",
	CompanySize51To200:   "51-200",
	CompanySize201To500:  "201-500",
	CompanySize501To1000: "501-1000",
	CompanySize1000Plus:  "1000+",
}

var CompanySizeRangesToID = map[string]int{
	"1-10":     CompanySize1To10,
	"11-50":    CompanySize11To50,
	"51-200":   CompanySize51To200,
	"201-500":  CompanySize201To500,
	"501-1000": CompanySize501To1000,
	"1000+":    CompanySize1000Plus,
}

// Helper functions
func GetIndustryName(id int) string {
	if name, exists := IndustryNames[id]; exists {
		return name
	}
	return "Unknown"
}

func GetIndustryID(name string) int {
	if id, exists := IndustryNamesToID[name]; exists {
		return id
	}
	return IndustryOther
}

func GetCompanySizeRange(id int) string {
	if size, exists := CompanySizeRanges[id]; exists {
		return size
	}
	return "Unknown"
}

func GetCompanySizeID(sizeRange string) int {
	if id, exists := CompanySizeRangesToID[sizeRange]; exists {
		return id
	}
	return CompanySize1To10 // Default to smallest range
}
