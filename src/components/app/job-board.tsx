import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jobData } from "@/lib/data";

export function JobBoard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Opportunities</CardTitle>
        <CardDescription>
          Browse job and internship openings posted by fellow alumni.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden lg:table-cell">Posted</TableHead>
              <TableHead className="text-right">Action</TableHead>
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
                    {job.type}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">{job.posted}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm">Apply</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
