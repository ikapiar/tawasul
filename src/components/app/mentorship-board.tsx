import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mentorshipData } from "@/lib/data";

export function MentorshipBoard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Find a Mentor</CardTitle>
        <CardDescription>
          Connect with experienced alumni who are open to mentoring.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Expertise</TableHead>
              <TableHead className="hidden md:table-cell">Current Role</TableHead>
              <TableHead className="text-center hidden sm:table-cell">Availability</TableHead>
              <TableHead className="text-right">Action</TableHead>
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
                    {mentor.availability}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm">Request</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
