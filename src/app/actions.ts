'use server';

import { suggestAlumniConnections, SuggestAlumniConnectionsInput, SuggestAlumniConnectionsOutput } from '@/ai/flows/suggest-alumni-connections';

type ActionResult = SuggestAlumniConnectionsOutput | { error: string };

export async function getAlumniSuggestions(input: SuggestAlumniConnectionsInput): Promise<ActionResult> {
  try {
    // A more robust implementation would fetch real alumni data from a database
    // and provide it to the model as context to get more accurate suggestions.
    // For now, we rely on the model's general knowledge.
    const result = await suggestAlumniConnections(input);
    return result;
  } catch (error) {
    console.error("Error getting alumni suggestions:", error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
