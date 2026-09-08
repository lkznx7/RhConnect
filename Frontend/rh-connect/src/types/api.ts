export interface DashboardSummary {
  total_employees: number;
  active_employees: number;
  departments: number;
  pending_vacations: number;
}

export interface DepartmentStats {
  department: string;
  active: number;
  on_vacation: number;
  inactive: number;
}
