'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
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
} from 'lucide-react';

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const menuItems = [
    { href: '/dashboard', label: 'Job Feed', icon: LayoutDashboard },
    { href: '/network', label: 'My Network', icon: Users },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
    { href: '/post-job', label: 'Post a Job', icon: PlusCircle },
  ];

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-primary" />
          <div className="font-bold text-xl">NexusConnect</div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
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
