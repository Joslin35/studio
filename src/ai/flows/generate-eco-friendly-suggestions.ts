'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized eco-friendly suggestions based on user lifestyle.
 *
 * The flow takes user lifestyle information as input and returns a set of tailored eco-friendly suggestions.
 * - generateEcoFriendlySuggestions - A function that generates eco-friendly suggestions.
 * - GenerateEcoFriendlySuggestionsInput - The input type for the generateEcoFriendlySuggestions function.
 * - GenerateEcoFriendlySuggestionsOutput - The return type for the generateEcoFriendlySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEcoFriendlySuggestionsInputSchema = z.object({
  lifestyle: z
    .string()
    .describe(
      'Detailed description of the user lifestyle, including transportation habits, dietary preferences, energy consumption, and shopping habits.'
    ),
  location: z
    .string()
    .describe('The user location, including city and country.'),
  preferences: z
    .string()
    .describe(
      'The user preferences, including specific areas of interest related to sustainability and eco-friendliness.'
    ),
});
export type GenerateEcoFriendlySuggestionsInput = z.infer<
  typeof GenerateEcoFriendlySuggestionsInputSchema
>;

const GenerateEcoFriendlySuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of personalized eco-friendly suggestions tailored to the user lifestyle, location and preferences.'
    ),
});
export type GenerateEcoFriendlySuggestionsOutput = z.infer<
  typeof GenerateEcoFriendlySuggestionsOutputSchema
>;

export async function generateEcoFriendlySuggestions(
  input: GenerateEcoFriendlySuggestionsInput
): Promise<GenerateEcoFriendlySuggestionsOutput> {
  return generateEcoFriendlySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEcoFriendlySuggestionsPrompt',
  input: {schema: GenerateEcoFriendlySuggestionsInputSchema},
  output: {schema: GenerateEcoFriendlySuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized eco-friendly suggestions.

  Based on the user's lifestyle, location and preferences, generate a list of actionable suggestions that can help them reduce their environmental impact.

  Lifestyle: {{{lifestyle}}}
  Location: {{{location}}}
  Preferences: {{{preferences}}}

  Suggestions:`,
});

const generateEcoFriendlySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateEcoFriendlySuggestionsFlow',
    inputSchema: GenerateEcoFriendlySuggestionsInputSchema,
    outputSchema: GenerateEcoFriendlySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
