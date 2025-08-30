'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createJob } from '@/app/actions/job.actions';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const JobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type JobFormValues = z.infer<typeof JobSchema>;

export function PostJobForm() {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      description: '',
    },
  });

  async function onSubmit(values: JobFormValues) {
    if (!user || !userProfile) {
      toast({ variant: 'destructive', title: 'You must be logged in to post a job.' });
      return;
    }
    
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('postedById', user.uid);
    formData.append('postedBy', userProfile.name);

    const result = await createJob(formData);

    if (result.success) {
      toast({ title: 'Success!', description: 'Your job has been posted.' });
      router.push('/dashboard');
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to post job.' });
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Acme Inc." {...field} />
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
                <Input placeholder="e.g. San Francisco, CA or Remote" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="Describe the role, responsibilities, and qualifications..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Post Job
        </Button>
      </form>
    </Form>
  );
}
