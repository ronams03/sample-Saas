import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
          <Link to="/" className="group flex items-center gap-2">
            <div className="h-7 w-7 rounded-sm bg-gradient-to-br from-brand-500 to-brand-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]" />
            <span className="font-extrabold tracking-tight">
              ForgeFlow
              <span className="ml-2 hidden text-xs font-semibold text-muted-foreground md:inline-block">
                {pathname}
              </span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {title ? (
            <span className="text-sm text-muted-foreground hidden sm:block">
              {title}
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}
