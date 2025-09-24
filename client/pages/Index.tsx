import { useEffect, useState } from "react";
import { DemoResponse } from "@shared/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CardBox from "@/components/CardBox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  const [exampleFromServer, setExampleFromServer] = useState("");
  useEffect(() => {
    fetchDemo();
  }, []);
  const fetchDemo = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setExampleFromServer(data.message);
    } catch (error) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto max-w-screen-2xl px-6 pb-16 pt-10">
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-brand-500" /> Clean SaaS
            Structure
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Role-driven Workflow for Admin • Staff • Client
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-muted-foreground">
            Each role has a sidebar drawer with dropdown sections and
            forged-edge cards for a sharp, modern UI. Fully responsive, clean,
            and organized.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link to="/admin">Enter as Admin</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/staff">Enter as Co-Admin / Staff</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/client">Enter as Employee / Client</Link>
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <RoleCard
            title="Admin"
            accent="admin"
            to="/admin"
            items={adminItems}
          />
          <RoleCard
            title="Co-Admin / Staff"
            accent="staff"
            to="/staff"
            items={staffItems}
          />
          <RoleCard
            title="Employee / Client"
            accent="client"
            to="/client"
            items={clientItems}
          />
        </section>

        <p className="mt-12 hidden text-center text-xs text-muted-foreground">
          {exampleFromServer}
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  title,
  items,
  to,
  accent,
}: {
  title: string;
  items: { label: string; features: string[] }[];
  to: string;
  accent: "admin" | "staff" | "client";
}) {
  return (
    <CardBox className="p-6" roleAccent={accent}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <Button asChild size="sm">
          <Link to={to}>Open</Link>
        </Button>
      </div>
      <Accordion type="multiple" className="space-y-2">
        {items.map((it) => (
          <AccordionItem
            key={it.label}
            value={it.label}
            className="rounded-md border"
          >
            <AccordionTrigger className="px-3 py-2 text-left text-sm">
              {it.label}
            </AccordionTrigger>
            <AccordionContent className="px-3">
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {it.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CardBox>
  );
}

const adminItems = [
  {
    label: "Dashboard",
    features: [
      "Global overview",
      "Stagnation & delay detection",
      "System alerts widget",
    ],
  },
  {
    label: "User Management",
    features: [
      "Add Clients & Co-Admins",
      "Archive / Restore users",
      "Assign roles",
      "Granular access control",
    ],
  },
  {
    label: "Task Management",
    features: [
      "Create / Assign / Edit / Reassign",
      "Archive / Restore",
      "Update status",
      "Comments",
    ],
  },
  {
    label: "Proof & Verification",
    features: ["View proofs", "Approve / Reject", "Audit trail"],
  },
  {
    label: "Announcements",
    features: ["Broadcast (global or selective)", "Archive history"],
  },
  {
    label: "Reports & Analytics",
    features: [
      "Detailed reports",
      "Export CSV / PDF / Excel",
      "Performance by user/group",
      "Productivity analytics",
    ],
  },
  {
    label: "Notifications",
    features: ["All system alerts", "Deadline & delay alerts for all users"],
  },
  {
    label: "Audit & Archive",
    features: [
      "Full audit logs",
      "Manage archive",
      "Restore / Delete permanently",
    ],
  },
  {
    label: "Settings",
    features: [
      "System settings",
      "Personal settings",
      "Security & access control",
    ],
  },
];

const staffItems = [
  {
    label: "Dashboard",
    features: [
      "Managed clients overview",
      "Client deadline/delay alerts",
      "Quick stats",
    ],
  },
  {
    label: "Client Management",
    features: [
      "View managed clients",
      "Request add/remove (Admin approval)",
      "Limited profile updates",
    ],
  },
  {
    label: "Task Management",
    features: [
      "Create & assign to managed clients",
      "Edit & reassign among clients",
      "Archive created tasks",
      "Update status",
      "Comments",
    ],
  },
  {
    label: "Proof & Verification",
    features: ["View client submissions", "Approve / Reject", "Limited audit"],
  },
  {
    label: "Reports & Analytics",
    features: ["Client-only reports", "Basic charts", "Limited export"],
  },
  {
    label: "Notifications",
    features: ["Alerts for managed clients", "Deadlines & delays"],
  },
  { label: "Announcements", features: ["View Admin announcements"] },
  { label: "Settings", features: ["Personal settings", "Profile update"] },
];

const clientItems = [
  {
    label: "Dashboard",
    features: ["Personal overview", "Deadline/delay alerts", "Quick summary"],
  },
  {
    label: "Profile",
    features: ["View & edit profile", "Change password / update info"],
  },
  {
    label: "Task Management",
    features: [
      "View assigned tasks",
      "Status: Not Started / In Progress / On Hold / Done",
      "Comments",
    ],
  },
  {
    label: "Proof Upload",
    features: [
      "Upload proof",
      "Attach files/screenshots",
      "Mark task done",
      "Submission history",
    ],
  },
  { label: "Notifications", features: ["Personal alerts", "Progress updates"] },
  { label: "Announcements", features: ["View broadcasts from Admin"] },
  {
    label: "Settings",
    features: ["Theme & language", "Security (2FA if enabled)"],
  },
];
