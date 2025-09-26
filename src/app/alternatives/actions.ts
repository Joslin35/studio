'use server';

import {
  recommendGreenAlternatives,
  RecommendGreenAlternativesInput,
  RecommendGreenAlternativesOutput,
} from '@/ai/flows/recommend-green-alternatives';
import { z } from 'zod';

const formSchema = z.object({
  productOrService: z.string().min(3, 'Please enter a valid product or service.'),
  userPreferences: z.string().optional(),
  location: z.string().optional(),
});

type AlternativesState = {
  form: {
    productOrService: string;
    userPreferences?: string;
    location?: string;
  };
  error?: string;
  recommendation?: RecommendGreenAlternativesOutput;
};

export async function getGreenAlternative(
  prevState: AlternativesState,
  formData: FormData
): Promise<AlternativesState> {
  const validatedFields = formSchema.safeParse({
    productOrService: formData.get('productOrService'),
    userPreferences: formData.get('userPreferences'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    return {
      form: {
        productOrService: formData.get('productOrService') as string,
        userPreferences: formData.get('userPreferences') as string,
        location: formData.get('location') as string,
      },
      error: validatedFields.error.flatten().fieldErrors.productOrService?.[0] || 'Invalid input.',
    };
  }

  try {
    const result = await recommendGreenAlternatives(validatedFields.data as RecommendGreenAlternativesInput);
    return {
      ...prevState,
      form: validatedFields.data,
      recommendation: result,
      error: undefined,
    };
  } catch (e) {
    return {
      ...prevState,
      form: validatedFields.data,
      error: 'Failed to find an alternative. Please try again.',
    };
  }
}
