'use client';

import React, { useState, useMemo } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav, type View } from '@/components/app/sidebar-nav';
import { Dashboard } from '@/components/app/dashboard';
import { AlumniDirectory } from '@/components/app/alumni-directory';
import { JobBoard } from '@/components/app/job-board';
import { MentorshipBoard } from '@/components/app/mentorship-board';
import { EventCalendar } from '@/components/app/event-calendar';
import { DirectMessaging } from '@/components/app/direct-messaging';
import { SmartMatching } from '@/components/app/smart-matching';
import { Header } from '@/components/app/header';

const viewConfig = {
  dashboard: { title: 'Dashboard', description: 'Welcome to your ikapiar Connect dashboard.' },
  alumni: { title: 'Alumni Directory', description: 'Search and connect with alumni.' },
  jobs: { title: 'Job Board', description: 'Find job and internship opportunities.' },
  mentorship: { title: 'Mentorship Board', description: 'Find a mentor to guide you.' },
  events: { title: 'Events', description: 'Upcoming networking events and reunions.' },
  messages: { title: 'Messages', description: 'Your private conversations.' },
  match: { title: 'Smart Matching', description: 'Get AI-powered alumni connection suggestions.' },
};

export default function Home() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const { title, description } = useMemo(() => viewConfig[activeView], [activeView]);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'alumni': return <AlumniDirectory />;
      case 'jobs': return <JobBoard />;
      case 'mentorship': return <MentorshipBoard />;
      case 'events': return <EventCalendar />;
      case 'messages': return <DirectMessaging />;
      case 'match': return <SmartMatching />;
      default: return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <SidebarNav activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <Header title={title} description={description} />
          <div className="flex-1 overflow-y-auto">
            <main className="p-4 md:p-6 lg:p-8">
              {renderContent()}
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
