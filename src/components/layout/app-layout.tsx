
'use client';

import { useAuth } from '@/hooks/use-auth';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/use-role';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const { setRole } = useRole();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleSignOut = () => {
    // This is a placeholder for a more robust sign-out that would likely involve the auth context
    setRole(null);
    router.push('/');
  };


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav onSignOut={handleSignOut} />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
