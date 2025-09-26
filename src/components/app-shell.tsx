import type { PropsWithChildren } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";
import { Leaf } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </div>
            <h1 className="text-xl font-semibold font-headline text-primary">EcoGenius</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
          {/* Footer content can go here */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card/50 px-6 backdrop-blur-sm md:h-16">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Header content can go here */}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
