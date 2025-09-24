import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardBoxProps {
  className?: string;
  roleAccent?: "admin" | "staff" | "client" | null;
  children: ReactNode;
}

export function CardBox({
  className,
  roleAccent = null,
  children,
}: CardBoxProps) {
  return (
    <div
      className={cn(
        "card-forged bg-card text-card-foreground",
        roleAccent ? `accent-${roleAccent}` : null,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default CardBox;
