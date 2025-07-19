import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

export function Header({ title, description }: { title: string, description: string }) {
  return (
    <header className="flex items-center justify-between p-4 md:p-6 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-headline text-primary">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
