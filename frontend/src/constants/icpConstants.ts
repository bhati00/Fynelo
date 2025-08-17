// constants/icpConstants.ts

// Backend constant values (matching your Go constants)
export const BACKEND_CONSTANTS = {
  BUSINESS_TYPES: {
    B2B_SAAS: 1,
    E_COMMERCE: 2,
    CONSULTING: 3,
    MANUFACTURING: 4,
    HEALTHCARE: 5,
    EDUCATION: 6,
    FINANCIAL: 7,
    REAL_ESTATE: 8,
    OTHER: 9,
  },
  COMPANY_SIZES: {
    SIZE_1_TO_10: 1,
    SIZE_11_TO_50: 2,
    SIZE_51_TO_200: 3,
    SIZE_201_TO_500: 4,
    SIZE_501_TO_1000: 5,
    SIZE_1000_PLUS: 6,
  },
  BUYER_ROLES: {
    CEO_FOUNDER: 1,
    CTO_VP_ENGINEERING: 2,
    MARKETING_DIRECTOR: 3,
    SALES_DIRECTOR: 4,
    OPERATIONS_MANAGER: 5,
    HR_DIRECTOR: 6,
    FINANCE_DIRECTOR: 7,
    PRODUCT_MANAGER: 8,
    IT_MANAGER: 9,
    OTHER: 10,
  },
} as const;

// User-friendly options with backend value mapping
export const BUSINESS_TYPE_OPTIONS = [
  { label: "B2B SaaS", value: BACKEND_CONSTANTS.BUSINESS_TYPES.B2B_SAAS },
  { label: "E-commerce", value: BACKEND_CONSTANTS.BUSINESS_TYPES.E_COMMERCE },
  { label: "Consulting", value: BACKEND_CONSTANTS.BUSINESS_TYPES.CONSULTING },
  { label: "Manufacturing", value: BACKEND_CONSTANTS.BUSINESS_TYPES.MANUFACTURING },
  { label: "Healthcare", value: BACKEND_CONSTANTS.BUSINESS_TYPES.HEALTHCARE },
  { label: "Education", value: BACKEND_CONSTANTS.BUSINESS_TYPES.EDUCATION },
  { label: "Financial Services", value: BACKEND_CONSTANTS.BUSINESS_TYPES.FINANCIAL },
  { label: "Real Estate", value: BACKEND_CONSTANTS.BUSINESS_TYPES.REAL_ESTATE },
  { label: "Other", value: BACKEND_CONSTANTS.BUSINESS_TYPES.OTHER },
];

export const COMPANY_SIZE_OPTIONS = [
  { label: "1-10 employees", value: BACKEND_CONSTANTS.COMPANY_SIZES.SIZE_1_TO_10 },
  { label: "11-50 employees", value: BACKEND_CONSTANTS.COMPANY_SIZES.SIZE_11_TO_50 },
  { label: "51-200 employees", value: BACKEND_CONSTANTS.COMPANY_SIZES.SIZE_51_TO_200 },
  { label: "201-500 employees", value: BACKEND_CONSTANTS.COMPANY_SIZES.SIZE_201_TO_500 },
  { label: "501-1000 employees", value: BACKEND_CONSTANTS.COMPANY_SIZES.SIZE_501_TO_1000 },
  { label: "1000+ employees", value: BACKEND_CONSTANTS.COMPANY_SIZES.SIZE_1000_PLUS },
];

export const BUYER_ROLE_OPTIONS = [
  { label: "CEO/Founder", value: BACKEND_CONSTANTS.BUYER_ROLES.CEO_FOUNDER },
  { label: "CTO/VP Engineering", value: BACKEND_CONSTANTS.BUYER_ROLES.CTO_VP_ENGINEERING },
  { label: "Marketing Director/CMO", value: BACKEND_CONSTANTS.BUYER_ROLES.MARKETING_DIRECTOR },
  { label: "Sales Director/VP Sales", value: BACKEND_CONSTANTS.BUYER_ROLES.SALES_DIRECTOR },
  { label: "Operations Manager", value: BACKEND_CONSTANTS.BUYER_ROLES.OPERATIONS_MANAGER },
  { label: "HR Director", value: BACKEND_CONSTANTS.BUYER_ROLES.HR_DIRECTOR },
  { label: "Finance Director/CFO", value: BACKEND_CONSTANTS.BUYER_ROLES.FINANCE_DIRECTOR },
  { label: "Product Manager", value: BACKEND_CONSTANTS.BUYER_ROLES.PRODUCT_MANAGER },
  { label: "IT Manager", value: BACKEND_CONSTANTS.BUYER_ROLES.IT_MANAGER },
  { label: "Other", value: BACKEND_CONSTANTS.BUYER_ROLES.OTHER },
];

// Helper functions for reverse mapping (if needed)
export const getBusinessTypeLabel = (value: number): string => {
  return BUSINESS_TYPE_OPTIONS.find(option => option.value === value)?.label || 'Unknown';
};

export const getCompanySizeLabel = (value: number): string => {
  return COMPANY_SIZE_OPTIONS.find(option => option.value === value)?.label || 'Unknown';
};

export const getBuyerRoleLabel = (value: number): string => {
  return BUYER_ROLE_OPTIONS.find(option => option.value === value)?.label || 'Unknown';
};

// Types for better TypeScript support
export type BusinessTypeValue = typeof BACKEND_CONSTANTS.BUSINESS_TYPES[keyof typeof BACKEND_CONSTANTS.BUSINESS_TYPES];
export type CompanySizeValue = typeof BACKEND_CONSTANTS.COMPANY_SIZES[keyof typeof BACKEND_CONSTANTS.COMPANY_SIZES];
export type BuyerRoleValue = typeof BACKEND_CONSTANTS.BUYER_ROLES[keyof typeof BACKEND_CONSTANTS.BUYER_ROLES];