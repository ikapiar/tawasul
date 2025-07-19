'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mentorshipData } from "@/lib/data";
import { useI18n } from "@/locales/client";

export function MentorshipBoard() {
  const t = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{t('mentorship.title')}</CardTitle>
        <CardDescription>
          {t('mentorship.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('mentorship.table.mentor')}</TableHead>
              <TableHead>{t('mentorship.table.expertise')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('mentorship.table.current_role')}</TableHead>
              <TableHead className="text-center hidden sm:table-cell">{t('mentorship.table.availability')}</TableHead>
              <TableHead className="text-right">{t('mentorship.table.action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mentorshipData.map((mentor) => (
              <TableRow key={mentor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={mentor.avatar} alt={mentor.name} data-ai-hint="professional headshot" />
                      <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{mentor.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{mentor.job}</TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  <Badge 
                    variant={mentor.availability === 'Available' ? 'default' : 'secondary'}
                    className={mentor.availability === 'Available' ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {t(`mentorship.availabilities.${mentor.availability.toLowerCase() as 'available' | 'limited' | 'unavailable'}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm">{t('mentorship.request_button')}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
