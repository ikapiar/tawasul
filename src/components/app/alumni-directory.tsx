'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { alumniData } from "@/lib/data";
import type { Alumni } from "@/lib/data";
import { Search, MessageSquare } from 'lucide-react';

export function AlumniDirectory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlumni = alumniData.filter(alumni =>
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name, major, job, or skill..."
          className="pl-10 text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAlumni.map((alumni: Alumni) => (
          <Card key={alumni.id} className="flex flex-col text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="items-center">
              <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
                <AvatarImage src={alumni.avatar} alt={alumni.name} data-ai-hint="professional headshot" />
                <AvatarFallback>{alumni.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-xl">{alumni.name}</CardTitle>
              <CardDescription>Class of {alumni.graduationYear}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <p className="font-semibold text-primary">{alumni.job}</p>
                <p className="text-sm text-muted-foreground">{alumni.company}</p>
                 <p className="text-sm text-muted-foreground">{alumni.major}</p>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {alumni.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" /> Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
