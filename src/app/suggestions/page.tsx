'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getEcoSuggestions } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Leaf, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  form: {
    lifestyle: '',
    location: '',
    preferences: '',
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Suggestions'
      )}
    </Button>
  );
}

export default function SuggestionsPage() {
  const [state, formAction] = useFormState(getEcoSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Personalized Eco-Suggestions
        </h1>
        <p className="text-muted-foreground mt-2">
          Tell us about yourself, and our AI will generate tailored sustainability tips for you.
        </p>
      </div>

      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>
              The more details you provide, the better the suggestions will be.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lifestyle">Lifestyle</Label>
              <Textarea
                id="lifestyle"
                name="lifestyle"
                placeholder="e.g., I commute by car, eat meat twice a week, and live in an apartment."
                defaultValue={state.form.lifestyle}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., San Francisco, USA"
                defaultValue={state.form.location}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferences">Preferences</Label>
              <Input
                id="preferences"
                name="preferences"
                placeholder="e.g., Interested in reducing plastic waste and saving water."
                defaultValue={state.form.preferences}
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.suggestions && (
        <Card>
          <CardHeader>
            <CardTitle>Your Eco-Friendly Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {state.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Leaf className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
