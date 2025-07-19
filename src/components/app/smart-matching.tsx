'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getAlumniSuggestions } from '@/app/actions';
import type { SuggestAlumniConnectionsOutput } from '@/ai/flows/suggest-alumni-connections';
import { Loader2, Sparkles, MessageSquare } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  studentProfile: z.string().min(50, {
    message: "Please provide a more detailed profile (at least 50 characters) for better suggestions.",
  }),
});

export function SmartMatching() {
  const [suggestions, setSuggestions] = useState<SuggestAlumniConnectionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentProfile: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    const result = await getAlumniSuggestions(values);

    if ('error' in result) {
      setError(result.error);
    } else {
      setSuggestions(result);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Find Your Connection</CardTitle>
            <CardDescription>
              Describe your academic interests, career aspirations, and hobbies. Our AI will find alumni with similar paths.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="studentProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Profile</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'I'm a junior passionate about renewable energy and data analysis. I'm looking for advice on breaking into the green tech industry and would love to connect with professionals in that field. I'm also part of the debate club and enjoy hiking.'"
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                     <Sparkles className="mr-2 h-4 w-4" /> Get Suggestions
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <h3 className="text-2xl font-headline font-bold mb-4">Suggested Connections</h3>
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="items-center">
                  <div className="w-24 h-24 mb-4 rounded-full bg-muted"></div>
                  <div className="h-6 w-40 bg-muted rounded"></div>
                  <div className="h-4 w-24 bg-muted rounded mt-1"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full bg-muted rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {suggestions && (
          <div className="grid gap-6 md:grid-cols-2">
            {suggestions.suggestedConnections.map((alumni, index) => (
              <Card key={index} className="flex flex-col text-center">
                 <CardHeader className="items-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
                        <AvatarImage src={`https://placehold.co/100x100.png?text=${alumni.name.charAt(0)}`} alt={alumni.name} data-ai-hint="professional headshot" />
                        <AvatarFallback>{alumni.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-xl">{alumni.name}</CardTitle>
                    <CardDescription>Class of {alumni.graduationYear}</CardDescription>
                </CardHeader>
                 <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                        <p className="font-semibold text-primary">{alumni.currentJob}</p>
                        <p className="text-sm text-muted-foreground">{alumni.major}</p>
                    </div>
                    <div className="my-4">
                        <p className="text-sm italic text-muted-foreground p-3 bg-secondary rounded-md">"{alumni.reason}"</p>
                    </div>
                    <Button className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" /> Connect
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
