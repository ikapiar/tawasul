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

export type View = 'dashboard' | 'alumni' | 'jobs' | 'mentorship' | 'events' | 'messages' | 'match';

interface SidebarNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'alumni', label: 'Alumni Directory', icon: Users },
  { id: 'jobs', label: 'Job Board', icon: Briefcase },
  { id: 'mentorship', label: 'Mentorship', icon: Handshake },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'match', label: 'Smart Match', icon: Sparkles },
];

export function SidebarNav({ activeView, setActiveView }: SidebarNavProps) {
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
