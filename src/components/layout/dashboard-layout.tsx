'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './sidebar';
import { Header } from './header';
import { MeshBackground } from '@/components/ui/mesh-background';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    email: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative flex flex-col min-h-screen min-w-0 flex-1 bg-background/50 dark:bg-black/50">
        <MeshBackground />
        <Header user={user} />
        <main className="relative flex-1 overflow-y-auto px-4 md:px-8 pb-8 scrollbar-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
