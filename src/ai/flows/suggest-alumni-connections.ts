// use server'

/**
 * @fileOverview Alumni connection suggestion flow.
 *
 * This file defines a Genkit flow that suggests relevant alumni connections
 * to students based on their profile, major, and interests. It exports the
 * SuggestAlumniConnectionsInput and SuggestAlumniConnectionsOutput types,
 * as well as the suggestAlumniConnections function to trigger the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlumniConnectionsInputSchema = z.object({
  studentProfile: z.string().describe('A detailed description of the student profile, including major, interests, and skills.'),
});
export type SuggestAlumniConnectionsInput = z.infer<typeof SuggestAlumniConnectionsInputSchema>;

const AlumniConnectionSchema = z.object({
  name: z.string().describe('The name of the alumni.'),
  graduationYear: z.number().describe('The graduation year of the alumni.'),
  major: z.string().describe('The major of the alumni.'),
  currentJob: z.string().describe('The current job of the alumni.'),
  skills: z.array(z.string()).describe('A list of skills the alumni possesses.'),
  contactInfo: z.string().describe('The contact information of the alumni.'),
  reason: z.string().describe('The reason why this alumni is a good connection for the student.'),
});

const SuggestAlumniConnectionsOutputSchema = z.object({
  suggestedConnections: z.array(AlumniConnectionSchema).describe('A list of suggested alumni connections for the student.'),
});
export type SuggestAlumniConnectionsOutput = z.infer<typeof SuggestAlumniConnectionsOutputSchema>;

export async function suggestAlumniConnections(input: SuggestAlumniConnectionsInput): Promise<SuggestAlumniConnectionsOutput> {
  return suggestAlumniConnectionsFlow(input);
}

const suggestAlumniConnectionsPrompt = ai.definePrompt({
  name: 'suggestAlumniConnectionsPrompt',
  input: {schema: SuggestAlumniConnectionsInputSchema},
  output: {schema: SuggestAlumniConnectionsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant alumni connections to students.

  Given the following student profile, suggest a list of alumni who would be valuable connections.
  For each suggested alumni, provide their name, graduation year, major, current job, skills, contact info, and a brief reason why they would be a good connection for the student.

  Student Profile: {{{studentProfile}}}

  Format your response as a JSON object with a "suggestedConnections" array.
`,
});

const suggestAlumniConnectionsFlow = ai.defineFlow(
  {
    name: 'suggestAlumniConnectionsFlow',
    inputSchema: SuggestAlumniConnectionsInputSchema,
    outputSchema: SuggestAlumniConnectionsOutputSchema,
  },
  async input => {
    const {output} = await suggestAlumniConnectionsPrompt(input);
    return output!;
  }
);
