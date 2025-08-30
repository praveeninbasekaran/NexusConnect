
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useRole } from '@/hooks/use-role';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  PlusCircle,
  LogOut,
  Briefcase,
  Home,
} from 'lucide-react';

export function SidebarNav({ onSignOut }: { onSignOut: () => void }) {
  const pathname = usePathname();
  const { userProfile } = useAuth();
  const { role, setRole } = useRole();

  const handleSignOut = async () => {
    // We call the passed onSignOut function which will reset the role
    onSignOut();
  };
  
  const handleHomeClick = () => {
    setRole(null);
  }

  const allMenuItems = [
    { href: '/dashboard', label: 'Job Feed', icon: LayoutDashboard, roles: ['job-seeker'] },
    { href: '/network', label: 'My Network', icon: Users, roles: ['job-seeker', 'employer'] },
    { href: '/messages', label: 'Messages', icon: MessageSquare, roles: ['job-seeker'] },
    { href: '/post-job', label: 'Post a Job', icon: PlusCircle, roles: ['employer'] },
  ];
  
  const menuItems = allMenuItems.filter(item => item.roles.includes(role || ''));

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-primary" />
                <div className="font-bold text-xl">NexusConnect</div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleHomeClick} aria-label="Go Home">
                <Home className="h-5 w-5" />
            </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                variant="default"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userProfile?.avatarUrl} />
              <AvatarFallback>
                {userProfile?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{userProfile?.name}</span>
           </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign Out">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}
