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
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { IkapiarLogo } from './ikapiar-logo';
import { useI18n } from '@/locales/client';
import type { ScopedT } from '@/locales/server';

export type View = 'dashboard' | 'alumni' | 'jobs' | 'mentorship' | 'events' | 'messages' | 'match';

interface SidebarNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export function SidebarNav({ activeView, setActiveView }: SidebarNavProps) {
  const t = useI18n();

  const navItems: { id: View; label: ScopedT<'sidebar.nav'>; icon: React.ElementType }[] = [
    { id: 'dashboard', label: t('sidebar.nav.dashboard'), icon: LayoutGrid },
    { id: 'alumni', label: t('sidebar.nav.alumni_directory'), icon: Users },
    { id: 'jobs', label: t('sidebar.nav.job_board'), icon: Briefcase },
    { id: 'mentorship', label: t('sidebar.nav.mentorship'), icon: Handshake },
    { id: 'events', label: t('sidebar.nav.events'), icon: Calendar },
    { id: 'messages', label: t('sidebar.nav.messages'), icon: MessageSquare },
    { id: 'match', label: t('sidebar.nav.smart_match'), icon: Sparkles },
  ];

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
    </Sidebar>
  );
}
