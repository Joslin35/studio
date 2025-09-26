'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getGreenAlternative } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Recycle } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  form: {
    productOrService: '',
    userPreferences: '',
    location: '',
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Searching...
        </>
      ) : (
        'Find Alternative'
      )}
    </Button>
  );
}

export default function AlternativesPage() {
  const [state, formAction] = useFormState(getGreenAlternative, initialState);
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
          Green Alternative Finder
        </h1>
        <p className="text-muted-foreground mt-2">
          Looking for a sustainable swap? Let our AI find a green alternative for you.
        </p>
      </div>

      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Product or Service</CardTitle>
            <CardDescription>
              Enter what you're looking to replace. You can add optional details for a better match.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productOrService">Product or Service</Label>
              <Input
                id="productOrService"
                name="productOrService"
                placeholder="e.g., Plastic water bottles, gas-powered lawnmower"
                defaultValue={state.form.productOrService}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPreferences">Preferences (Optional)</Label>
              <Input
                id="userPreferences"
                name="userPreferences"
                placeholder="e.g., Locally made, budget-friendly"
                defaultValue={state.form.userPreferences}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Austin, TX"
                defaultValue={state.form.location}
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.recommendation && (
        <Card className="bg-accent/20">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="flex-shrink-0">
              <Recycle className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-grow">
              <CardTitle>Your Green Alternative</CardTitle>
              <p className="text-sm text-muted-foreground">
                For "{state.form.productOrService}"
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold font-headline text-primary">{state.recommendation.alternative}</h3>
            <p className="mt-2 text-foreground/80">{state.recommendation.reasoning}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
