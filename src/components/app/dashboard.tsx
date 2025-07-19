'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Handshake, Calendar, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/locales/client";

export function Dashboard() {
  const t = useI18n();

  const features = [
    {
      icon: Users,
      title: t('dashboard.features.alumni.title'),
      description: t('dashboard.features.alumni.description'),
      color: "text-blue-500",
    },
    {
      icon: Briefcase,
      title: t('dashboard.features.jobs.title'),
      description: t('dashboard.features.jobs.description'),
      color: "text-green-500",
    },
    {
      icon: Handshake,
      title: t('dashboard.features.mentorship.title'),
      description: t('dashboard.features.mentorship.description'),
      color: "text-purple-500",
    },
    {
      icon: Calendar,
      title: t('dashboard.features.events.title'),
      description: t('dashboard.features.events.description'),
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="bg-primary text-primary-foreground shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 space-y-4 flex-1">
            <h2 className="text-3xl font-bold font-headline">{t('dashboard.welcome_back')}</h2>
            <p className="text-primary-foreground/80 max-w-2xl">
              {t('dashboard.welcome_message')}
            </p>
            <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
              {t('dashboard.explore_network_button')} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative h-48 md:h-auto md:w-1/3">
             <Image
                src="https://placehold.co/600x400.png"
                alt={t('dashboard.networking_alt')}
                fill
                className="object-cover"
                data-ai-hint="community networking"
              />
          </div>
        </div>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <feature.icon className={`w-8 h-8 mb-2 ${feature.color}`} strokeWidth={1.5} />
              <CardTitle className="font-headline">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="grid gap-6 lg:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-accent"/>{t('dashboard.ai_connections.title')}</CardTitle>
                <CardDescription>{t('dashboard.ai_connections.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>{t('dashboard.find_matches_button')}</Button>
            </CardContent>
         </Card>
         <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><MessageSquare />{t('dashboard.messaging.title')}</CardTitle>
                <CardDescription>{t('dashboard.messaging.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>{t('dashboard.open_messages_button')}</Button>
            </CardContent>
         </Card>
       </div>
    </div>
  );
}
