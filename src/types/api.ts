export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: "active" | "inactive" | "vacation";
  admission_date: string;
  avatar_url?: string;
}

export interface DepartmentStats {
  department: string;
  headcount: number;
  active: number;
  on_vacation: number;
  inactive: number;
}

export interface DashboardSummary {
  total_employees: number;
  active_employees: number;
  departments: number;
  pending_vacations: number;
  monthly_admissions: number;
  department_stats: DepartmentStats[];
}
