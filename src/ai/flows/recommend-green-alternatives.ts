'use server';

/**
 * @fileOverview Recommends green alternatives to common products and services.
 *
 * - recommendGreenAlternatives - A function that handles the recommendation process.
 * - RecommendGreenAlternativesInput - The input type for the recommendGreenAlternatives function.
 * - RecommendGreenAlternativesOutput - The return type for the recommendGreenAlternatives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendGreenAlternativesInputSchema = z.object({
  productOrService: z
    .string()
    .describe('The common product or service to find a green alternative for.'),
  userPreferences: z
    .string()
    .optional()
    .describe('Any specific user preferences for the alternative.'),
  location: z
    .string()
    .optional()
    .describe('The user location to find local green alternatives.'),
});
export type RecommendGreenAlternativesInput = z.infer<
  typeof RecommendGreenAlternativesInputSchema
>;

const RecommendGreenAlternativesOutputSchema = z.object({
  alternative: z.string().describe('The recommended green alternative.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the recommendation.'),
});
export type RecommendGreenAlternativesOutput = z.infer<
  typeof RecommendGreenAlternativesOutputSchema
>;

export async function recommendGreenAlternatives(
  input: RecommendGreenAlternativesInput
): Promise<RecommendGreenAlternativesOutput> {
  return recommendGreenAlternativesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendGreenAlternativesPrompt',
  input: {schema: RecommendGreenAlternativesInputSchema},
  output: {schema: RecommendGreenAlternativesOutputSchema},
  prompt: `You are an expert in recommending eco-friendly alternatives to common products and services. Given the user's request, provide a sustainable alternative, considering their preferences and location.

Product or Service: {{{productOrService}}}
User Preferences: {{{userPreferences}}}
Location: {{{location}}}

Respond with the recommended alternative and a brief explanation of why it is a more sustainable choice.`,
});

const recommendGreenAlternativesFlow = ai.defineFlow(
  {
    name: 'recommendGreenAlternativesFlow',
    inputSchema: RecommendGreenAlternativesInputSchema,
    outputSchema: RecommendGreenAlternativesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
