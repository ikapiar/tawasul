'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jobData } from "@/lib/data";
import { useI18n } from "@/locales/client";

export function JobBoard() {
  const t = useI18n();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{t('jobs.title')}</CardTitle>
        <CardDescription>
          {t('jobs.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('jobs.table.role')}</TableHead>
              <TableHead>{t('jobs.table.company')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('jobs.table.location')}</TableHead>
              <TableHead className="hidden sm:table-cell">{t('jobs.table.type')}</TableHead>
              <TableHead className="hidden lg:table-cell">{t('jobs.table.posted')}</TableHead>
              <TableHead className="text-right">{t('jobs.table.action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobData.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                <TableCell className="hidden sm:table-cell">
                   <Badge variant={job.type === 'Internship' ? 'default' : 'secondary'} className={job.type === 'Internship' ? 'bg-accent text-accent-foreground' : ''}>
                    {t(`jobs.types.${job.type.toLowerCase() as 'full-time' | 'internship' | 'part-time'}`)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">{job.posted}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm">{t('jobs.apply_button')}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
