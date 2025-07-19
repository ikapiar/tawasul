import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Handshake, Calendar, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Users,
    title: "Alumni Directory",
    description: "Explore profiles and connect with fellow alumni.",
    color: "text-blue-500",
  },
  {
    icon: Briefcase,
    title: "Job Board",
    description: "Discover exclusive job and internship opportunities.",
    color: "text-green-500",
  },
  {
    icon: Handshake,
    title: "Mentorship",
    description: "Find a mentor or offer your guidance to students.",
    color: "text-purple-500",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Stay updated on upcoming networking events.",
    color: "text-red-500",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <Card className="bg-primary text-primary-foreground shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 space-y-4 flex-1">
            <h2 className="text-3xl font-bold font-headline">Welcome Back!</h2>
            <p className="text-primary-foreground/80 max-w-2xl">
              Your network is your net worth. Reconnect with old friends, forge new professional relationships, and explore opportunities within the ikapiar community.
            </p>
            <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Explore Network <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative h-48 md:h-auto md:w-1/3">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Networking event"
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
                <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-accent"/> AI-Powered Connections</CardTitle>
                <CardDescription>Let our Smart Matching tool introduce you to relevant alumni based on your interests and career goals.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>Find Matches</Button>
            </CardContent>
         </Card>
         <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><MessageSquare /> Direct Messaging</CardTitle>
                <CardDescription>Start a conversation, ask for advice, or just say hello with our private messaging system.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>Open Messages</Button>
            </CardContent>
         </Card>
       </div>
    </div>
  );
}
