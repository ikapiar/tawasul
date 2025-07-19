'use client'

import React from 'react';
import {
  LayoutGrid,
  Users,
  Briefcase,
  Handshake,
  Calendar,
  MessageSquare,
  Sparkles,
  UserCircle,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { IkapiarLogo } from './ikapiar-logo';
import { useI18n } from '@/locales/client';
import type { ScopedT } from '@/locales/server';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/client';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export type View = 'dashboard' | 'alumni' | 'jobs' | 'mentorship' | 'events' | 'messages' | 'match' | 'profile';

interface SidebarNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export function SidebarNav({ activeView, setActiveView }: SidebarNavProps) {
  const t = useI18n();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navItems: { id: View; label: ScopedT<'sidebar.nav'>; icon: React.ElementType }[] = [
    { id: 'dashboard', label: t('sidebar.nav.dashboard'), icon: LayoutGrid },
    { id: 'alumni', label: t('sidebar.nav.alumni_directory'), icon: Users },
    { id: 'jobs', label: t('sidebar.nav.job_board'), icon: Briefcase },
    { id: 'mentorship', label: t('sidebar.nav.mentorship'), icon: Handshake },
    { id: 'events', label: t('sidebar.nav.events'), icon: Calendar },
    { id: 'messages', label: t('sidebar.nav.messages'), icon: MessageSquare },
    { id: 'match', label: t('sidebar.nav.smart_match'), icon: Sparkles },
  ];

  const profileItem = { id: 'profile', label: t('sidebar.nav.my_profile'), icon: UserCircle };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <IkapiarLogo className="w-8 h-8" />
          <span className="text-lg font-bold font-headline text-primary group-data-[collapsible=icon]:hidden">
            ikapiar Connect
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveView(item.id as View)}
                isActive={activeView === item.id}
                tooltip={{ children: item.label, side: 'right' }}
                className="justify-start"
              >
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
         <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
            <span className="group-data-[collapsible=icon]:hidden ml-2">{t('landing.nav.logout')}</span>
        </Button>
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton
                onClick={() => setActiveView(profileItem.id as View)}
                isActive={activeView === profileItem.id}
                tooltip={{ children: profileItem.label, side: 'right' }}
                className="justify-start"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? 'User'} />
                  <AvatarFallback>{user?.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
                </Avatar>
                <div className="group-data-[collapsible=icon]:hidden flex flex-col items-start">
                   <span className="font-semibold">{user?.displayName ?? 'User'}</span>
                   <span className="text-xs text-muted-foreground">{profileItem.label}</span>
                </div>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
