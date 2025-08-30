
'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Loader2 } from 'lucide-react';
import { useRole } from '@/hooks/use-role';
import { RoleSelectionPage } from './role-selection-page';
import DashboardPage from '@/app/dashboard/page';
import PostJobPage from '@/app/post-job/page';
import NetworkPage from '@/app/network/page';
import MessagesPage from '@/app/messages/page';
import { usePathname } from 'next/navigation';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const { role, setRole } = useRole();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!role) {
    return <RoleSelectionPage onSelectRole={setRole} />;
  }

  const handleSignOut = () => {
    setRole(null);
  };
  
  const renderContent = () => {
    if (pathname.startsWith('/network')) {
        return children;
    }
    switch (pathname) {
        case '/dashboard':
            return role === 'job-seeker' ? <DashboardPage />: null;
        case '/network':
            return <NetworkPage />;
        case '/messages':
            return role === 'job-seeker' ? <MessagesPage /> : null;
        case '/post-job':
            return role === 'employer' ? <PostJobPage /> : null;
        default:
             if (role === 'job-seeker') return <DashboardPage/>
             if (role === 'employer') return <PostJobPage/>
             return children;
    }
  }


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav onSignOut={handleSignOut} />
      </Sidebar>
      <SidebarInset>{renderContent()}</SidebarInset>
    </SidebarProvider>
  );
}

