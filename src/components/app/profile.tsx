'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone, Linkedin } from "lucide-react";
import { useI18n } from "@/locales/client";

// Mock data for the user profile. In a real application, this would come from an API.
const userProfile = {
  name: 'Your Name',
  avatar: 'https://placehold.co/100x100.png',
  graduationYear: 2020,
  major: 'Computer Science',
  job: 'Software Engineer',
  company: 'Firebase',
  about: "Driven and passionate software engineer with a knack for building beautiful and functional user interfaces. I'm always eager to learn new technologies and collaborate with talented people. In my free time, I enjoy contributing to open-source projects and mentoring aspiring developers.",
  skills: ['React', 'TypeScript', 'Next.js', 'Firebase', 'Tailwind CSS', 'Node.js'],
  contact: {
    email: 'your.name@example.com',
    phone: '+1 234 567 890',
    linkedin: 'https://linkedin.com/in/yourprofile'
  }
};


export function Profile() {
  const t = useI18n();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} data-ai-hint="professional headshot" />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold font-headline">{userProfile.name}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {userProfile.job} at {userProfile.company}
              </CardDescription>
              <p className="text-sm text-muted-foreground">{t('alumni.class_of')} {userProfile.graduationYear} &middot; {userProfile.major}</p>
            </div>
          </div>
          <Button>
            <Edit className="mr-2 h-4 w-4" /> {t('profile.edit_button')}
          </Button>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('profile.about_me')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{userProfile.about}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('profile.skills')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('profile.contact')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href={`mailto:${userProfile.contact.email}`} className="text-primary hover:underline">
                  {userProfile.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{userProfile.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
                <a href={userProfile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
