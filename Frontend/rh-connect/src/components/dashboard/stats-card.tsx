import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, Briefcase, CalendarCheck, TrendingUp } from "lucide-react";
import type { DashboardSummary } from "@/types/api";
import { getAuthHeadersServer } from "@/lib/auth";
import { cookies } from "next/headers";

const ICON_MAP = {
  total_employees: Users,
  active_employees: TrendingUp,
  departments: Briefcase,
  pending_vacations: CalendarCheck,
} as const;

const LABEL_MAP = {
  total_employees: "Total de Colaboradores",
  active_employees: "Ativos",
  departments: "Departamentos",
  pending_vacations: "Ferias Pendentes",
} as const;

type StatKey = keyof typeof LABEL_MAP;

interface StatsResponse {
  data: DashboardSummary;
}

async function fetchDashboardStats(): Promise<DashboardSummary | null> {
  const cookieStore = await cookies();
  const headers = getAuthHeadersServer(cookieStore);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"}/dashboard/summary`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const json: StatsResponse = await res.json();
  return json.data;
}

export async function StatsCardGroup() {
  const stats = await fetchDashboardStats();

  if (!stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <CardTitle className="h-5 w-32 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statKeys: StatKey[] = ["total_employees", "active_employees", "departments", "pending_vacations"];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statKeys.map((key) => {
        const Icon = ICON_MAP[key];
        return (
          <Card key={key}>
            <CardHeader>
              <CardDescription>{LABEL_MAP[key]}</CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold tabular-nums">
                <Icon className="size-5 text-muted-foreground" />
                {stats[key]}
              </CardTitle>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
