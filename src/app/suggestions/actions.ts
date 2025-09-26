'use server';

import {
  generateEcoFriendlySuggestions,
  GenerateEcoFriendlySuggestionsInput,
  GenerateEcoFriendlySuggestionsOutput,
} from '@/ai/flows/generate-eco-friendly-suggestions';
import { z } from 'zod';

const formSchema = z.object({
  lifestyle: z.string().min(10, 'Please provide more details about your lifestyle.'),
  location: z.string().min(2, 'Please provide a valid location.'),
  preferences: z.string().min(5, 'Please describe your preferences.'),
});

type SuggestionsState = {
  form: {
    lifestyle: string;
    location: string;
    preferences: string;
  };
  error?: string;
  suggestions?: GenerateEcoFriendlySuggestionsOutput['suggestions'];
};

export async function getEcoSuggestions(
  prevState: SuggestionsState,
  formData: FormData
): Promise<SuggestionsState> {
  const validatedFields = formSchema.safeParse({
    lifestyle: formData.get('lifestyle'),
    location: formData.get('location'),
    preferences: formData.get('preferences'),
  });

  if (!validatedFields.success) {
    return {
      form: {
        lifestyle: formData.get('lifestyle') as string,
        location: formData.get('location') as string,
        preferences: formData.get('preferences') as string,
      },
      error: validatedFields.error.flatten().fieldErrors.lifestyle?.[0] || 
             validatedFields.error.flatten().fieldErrors.location?.[0] || 
             validatedFields.error.flatten().fieldErrors.preferences?.[0] ||
             "Invalid input."
    };
  }

  try {
    const result = await generateEcoFriendlySuggestions(validatedFields.data as GenerateEcoFriendlySuggestionsInput);
    return {
      ...prevState,
      form: validatedFields.data,
      suggestions: result.suggestions,
      error: undefined,
    };
  } catch (e) {
    return {
      ...prevState,
      form: validatedFields.data,
      error: 'Failed to generate suggestions. Please try again.',
    };
  }
}
