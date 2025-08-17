export interface ICPProfile {
  id: string;
  user_id: number;
  business_type: number;
  industry: string;
  company_size: number;
  buyer_roles: number;
  problem_statement: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
