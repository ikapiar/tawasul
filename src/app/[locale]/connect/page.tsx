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
import { useI18n } from '@/locales/client';
import type { ScopedT } from '@/locales/server';

export default function ConnectPage() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const t = useI18n();

  const viewConfig: Record<View, { title: ScopedT<'home.views.titles'>, description: ScopedT<'home.views.descriptions'> }> = useMemo(() => ({
    dashboard: { title: t('home.views.titles.dashboard'), description: t('home.views.descriptions.dashboard') },
    alumni: { title: t('home.views.titles.alumni'), description: t('home.views.descriptions.alumni') },
    jobs: { title: t('home.views.titles.jobs'), description: t('home.views.descriptions.jobs') },
    mentorship: { title: t('home.views.titles.mentorship'), description: t('home.views.descriptions.mentorship') },
    events: { title: t('home.views.titles.events'), description: t('home.views.descriptions.events') },
    messages: { title: t('home.views.titles.messages'), description: t('home.views.descriptions.messages') },
    match: { title: t('home.views.titles.match'), description: t('home.views.descriptions.match') },
  }), [t]);

  const { title, description } = useMemo(() => viewConfig[activeView], [activeView, viewConfig]);

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
