import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, ClipboardList, ShieldCheck, Megaphone,
  BarChart3, Bell, Archive, Settings, UserSquare2, UploadCloud,
  FolderKanban
} from "lucide-react";

export type Role = "admin" | "staff" | "client";

interface SidebarDrawerProps {
  role: Role;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface MenuItem { key: string; label: string; icon: JSX.Element; to: string; }
interface MenuSection { key: string; label: string; items: MenuItem[]; }

const ICON = {
  dashboard: <LayoutDashboard className="h-4 w-4" />, users: <Users className="h-4 w-4" />, tasks: <ClipboardList className="h-4 w-4" />, proofs: <ShieldCheck className="h-4 w-4" />, announcements: <Megaphone className="h-4 w-4" />, reports: <BarChart3 className="h-4 w-4" />, notifications: <Bell className="h-4 w-4" />, audit: <Archive className="h-4 w-4" />, settings: <Settings className="h-4 w-4" />, profile: <UserSquare2 className="h-4 w-4" />, upload: <UploadCloud className="h-4 w-4" />, clients: <FolderKanban className="h-4 w-4" />
};

function buildSections(role: Role, base: string): MenuSection[] {
  if (role === "admin") {
    return [
      { key: "dashboard", label: "Dashboard", items: [{ key: "dashboard", label: "Overview", icon: ICON.dashboard, to: `${base}/dashboard` }] },
      { key: "users", label: "User Management", items: [
        { key: "user-management", label: "Manage Users", icon: ICON.users, to: `${base}/user-management` },
      ]},
      { key: "tasks", label: "Task Management", items: [
        { key: "task-management", label: "Tasks", icon: ICON.tasks, to: `${base}/task-management` },
      ]},
      { key: "proofs", label: "Proof & Verification", items: [
        { key: "proofs", label: "Proofs", icon: ICON.proofs, to: `${base}/proofs` },
      ]},
      { key: "announcements", label: "Announcements", items: [
        { key: "announcements", label: "Broadcast", icon: ICON.announcements, to: `${base}/announcements` },
      ]},
      { key: "reports", label: "Reports & Analytics", items: [
        { key: "reports", label: "Reports", icon: ICON.reports, to: `${base}/reports` },
      ]},
      { key: "notifications", label: "Notifications", items: [
        { key: "notifications", label: "Alerts", icon: ICON.notifications, to: `${base}/notifications` },
      ]},
      { key: "audit", label: "Audit & Archive", items: [
        { key: "audit", label: "Audit Logs", icon: ICON.audit, to: `${base}/audit` },
      ]},
      { key: "settings", label: "Settings", items: [
        { key: "settings", label: "All Settings", icon: ICON.settings, to: `${base}/settings` },
      ]},
    ];
  }
  if (role === "staff") {
    return [
      { key: "dashboard", label: "Dashboard", items: [{ key: "dashboard", label: "Overview", icon: ICON.dashboard, to: `${base}/dashboard` }] },
      { key: "clients", label: "Client Management", items: [{ key: "client-management", label: "Clients", icon: ICON.clients, to: `${base}/client-management` }] },
      { key: "tasks", label: "Task Management", items: [{ key: "task-management", label: "Tasks", icon: ICON.tasks, to: `${base}/task-management` }] },
      { key: "proofs", label: "Proof & Verification", items: [{ key: "proofs", label: "Proofs", icon: ICON.proofs, to: `${base}/proofs` }] },
      { key: "reports", label: "Reports & Analytics", items: [{ key: "reports", label: "Reports", icon: ICON.reports, to: `${base}/reports` }] },
      { key: "notifications", label: "Notifications", items: [{ key: "notifications", label: "Alerts", icon: ICON.notifications, to: `${base}/notifications` }] },
      { key: "announcements", label: "Announcements", items: [{ key: "announcements", label: "Announcements", icon: ICON.announcements, to: `${base}/announcements` }] },
      { key: "settings", label: "Settings", items: [{ key: "settings", label: "Personal Settings", icon: ICON.settings, to: `${base}/settings` }] },
    ];
  }
  return [
    { key: "dashboard", label: "Dashboard", items: [{ key: "dashboard", label: "Overview", icon: ICON.dashboard, to: `${base}/dashboard` }] },
    { key: "profile", label: "Profile", items: [{ key: "profile", label: "My Profile", icon: ICON.profile, to: `${base}/profile` }] },
    { key: "tasks", label: "Task Management", items: [{ key: "task-management", label: "My Tasks", icon: ICON.tasks, to: `${base}/task-management` }] },
    { key: "proofs", label: "Proof Upload", items: [{ key: "proof-upload", label: "Upload Proof", icon: ICON.upload, to: `${base}/proof-upload` }] },
    { key: "notifications", label: "Notifications", items: [{ key: "notifications", label: "Alerts", icon: ICON.notifications, to: `${base}/notifications` }] },
    { key: "announcements", label: "Announcements", items: [{ key: "announcements", label: "Announcements", icon: ICON.announcements, to: `${base}/announcements` }] },
    { key: "settings", label: "Settings", items: [{ key: "settings", label: "Settings", icon: ICON.settings, to: `${base}/settings` }] },
  ];
}

export default function SidebarDrawer({ role, open, onOpenChange }: SidebarDrawerProps) {
  const params = useParams();
  const base = `/${role}`;
  const sections = useMemo(() => buildSections(role, base), [role, base]);
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;

  const handleOpen = () => {
    const next = !isOpen;
    if (onOpenChange) onOpenChange(next);
    else setInternalOpen(next);
  };

  return (
    <aside className={cn(
      "fixed inset-y-14 left-0 z-40 w-72 border-r bg-sidebar text-sidebar-foreground transition-transform duration-200 md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      role === "admin" && "ring-1 ring-brand-500/10",
    )}>
      <div className="h-full overflow-y-auto p-3">
        <Accordion type="multiple" defaultValue={["dashboard"]} className="space-y-1">
          {sections.map((section) => (
            <AccordionItem key={section.key} value={section.key} className="rounded-sm border-none">
              <AccordionTrigger className="rounded-sm px-3 py-2 text-left text-sm hover:bg-sidebar-accent">
                {section.label}
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.key}>
                      <Link
                        to={item.to}
                        className={cn(
                          "flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground/90 hover:bg-accent/60",
                          params.section === item.key && "bg-accent/70",
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <button aria-hidden className="absolute -right-3 top-4 rounded-full border bg-background p-1 shadow md:hidden" onClick={handleOpen} />
    </aside>
  );
}
