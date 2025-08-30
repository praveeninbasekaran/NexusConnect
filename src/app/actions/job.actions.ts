'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';

const JobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  postedById: z.string(),
  postedBy: z.string(),
});

export async function createJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = JobSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await addDoc(collection(db, 'jobs'), {
      ...parsed.data,
      createdAt: serverTimestamp(),
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create job posting.',
    };
  }
}
