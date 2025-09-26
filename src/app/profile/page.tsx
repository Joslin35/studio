'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z.string().email(),
  location: z.string().min(2, 'Please provide a valid location.'),
  interests: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can be fetched from a database in a real app
const defaultValues: Partial<ProfileFormValues> = {
  name: 'Alex Green',
  email: 'alex.green@example.com',
  location: 'San Francisco, USA',
  interests: 'Reducing plastic waste, composting, sustainable fashion',
};

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

export default function ProfilePage() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved successfully.',
    });
  }

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Your Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize your profile. This information helps personalize your experience.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Update your personal information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center gap-6">
                {userAvatar && (
                  <div className="relative h-24 w-24">
                     <Image
                      src={userAvatar.imageUrl}
                      alt={userAvatar.description}
                      data-ai-hint={userAvatar.imageHint}
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, USA" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your location helps in providing relevant local suggestions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eco Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you're passionate about, e.g., renewable energy, zero waste..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      Your interests help us tailor AI suggestions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="default">Update Profile</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
