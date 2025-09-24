import { useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import SidebarDrawer, { Role } from "@/components/layout/SidebarDrawer";
import Header from "@/components/layout/Header";
import CardBox from "@/components/CardBox";
import { Button } from "@/components/ui/button";
import { BarChart3, CheckCircle2, Clock, FileText } from "lucide-react";

const VALID_ROLES = ["admin", "staff", "client"] as const;

export default function RolePage() {
  const { role: roleParam, section } = useParams();
  const role = (roleParam || "") as Role;
  if (!VALID_ROLES.includes(role as any)) return <Navigate to="/" replace />;

  const title = useMemo(() => {
    if (!section || section === "dashboard") return `${role[0].toUpperCase()}${role.slice(1)} Dashboard`;
    return `${section.replace(/-/g, " ")}`;
  }, [role, section]);

  return (
    <div data-role={role} className="min-h-screen">
      <Header title={title} />
      <SidebarDrawer role={role} />
      <main className="md:pl-72">
        <div className="mx-auto max-w-screen-2xl p-6">
          {!section || section === "dashboard" ? (
            <Dashboard role={role} />
          ) : (
            <Placeholder section={section} role={role} />
          )}
        </div>
      </main>
    </div>
  );
}

function Dashboard({ role }: { role: Role }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <CardBox className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Active Tasks</p>
            <p className="mt-2 text-3xl font-extrabold">42</p>
          </div>
          <BarChart3 className="h-6 w-6 text-foreground/70" />
        </div>
      </CardBox>
      <CardBox className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Due Today</p>
            <p className="mt-2 text-3xl font-extrabold">8</p>
          </div>
          <Clock className="h-6 w-6 text-foreground/70" />
        </div>
      </CardBox>
      <CardBox className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Completed</p>
            <p className="mt-2 text-3xl font-extrabold">128</p>
          </div>
          <CheckCircle2 className="h-6 w-6 text-foreground/70" />
        </div>
      </CardBox>
      <CardBox className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Reports Generated</p>
            <p className="mt-2 text-3xl font-extrabold">23</p>
          </div>
          <FileText className="h-6 w-6 text-foreground/70" />
        </div>
      </CardBox>

      <CardBox className="col-span-1 md:col-span-2 xl:col-span-3 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start justify-between rounded-md border p-3">
            <span><b>Alex</b> updated task status to <b>In Progress</b> in "Website Redesign"</span>
            <span className="text-muted-foreground">2m</span>
          </li>
          <li className="flex items-start justify-between rounded-md border p-3">
            <span><b>Jordan</b> submitted proof for "Monthly Report"</span>
            <span className="text-muted-foreground">12m</span>
          </li>
          <li className="flex items-start justify-between rounded-md border p-3">
            <span>Deadline approaching for <b>Client Onboarding</b></span>
            <span className="text-muted-foreground">1h</span>
          </li>
        </ul>
      </CardBox>

      <CardBox className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm">New Task</Button>
          <Button size="sm" variant="secondary">Export CSV</Button>
          <Button size="sm" variant="outline">Broadcast</Button>
          <Button size="sm" variant="ghost">Settings</Button>
        </div>
      </CardBox>
    </div>
  );
}

function Placeholder({ section, role }: { section?: string; role: Role }) {
  const title = (section || "").replace(/-/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
  return (
    <CardBox className="p-10 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-muted-foreground">This page will be built next. It inherits the global layout, role-based sidebar, and forged-edge styling.</p>
      <p className="mt-6 text-xs text-muted-foreground">Role: {role}</p>
    </CardBox>
  );
}
