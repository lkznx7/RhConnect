"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import api from "@/services/api";
import type { DepartmentStats } from "@/types/api";

function buildChartData(departments: DepartmentStats[]) {
  return departments.map((d) => ({
    name: d.department,
    Ativos: d.active,
    Ferias: d.on_vacation,
    Inativos: d.inactive,
  }));
}

export function EmployeeChart() {
  const [data, setData] = useState<ReturnType<typeof buildChartData>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await api.get<{ data: DepartmentStats[] }>("/dashboard/department-stats");
        if (!cancelled) setData(buildChartData(res.data.data));
      } catch {
        if (!cancelled) setError("Nao foi possivel carregar os dados.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="size-5" />
          Colaboradores por Departamento
        </CardTitle>
        <CardDescription>Distribuicao de colaboradores ativos, em ferias e inativos.</CardDescription>
      </CardHeader>
      <CardContent className="h-[320px]">
        {loading && <div className="h-full animate-pulse rounded-lg bg-muted" />}
        {!loading && error && <p className="text-sm text-destructive">{error}</p>}
        {!loading && !error && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ativos" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Ferias" fill="var(--chart-3)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Inativos" fill="var(--chart-5)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
