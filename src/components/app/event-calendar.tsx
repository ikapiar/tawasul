import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { eventData, eventDays, eventDayStyle } from "@/lib/data";
import { format } from "date-fns";

export function EventCalendar() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
           <CardContent className="p-0">
             <Calendar
                mode="single"
                selected={new Date()}
                modifiers={eventDays}
                modifiersStyles={eventDayStyle}
                className="p-3 w-full"
              />
           </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-2xl font-headline font-bold">Upcoming Events</h3>
        {eventData.map(event => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline">{event.title}</CardTitle>
                    <CardDescription>{format(event.date, "MMMM d, yyyy")}</CardDescription>
                  </div>
                  <Badge variant={event.type === 'Networking' ? 'default' : 'secondary'} className={event.type === 'Networking' ? 'bg-accent text-accent-foreground' : ''}>{event.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
