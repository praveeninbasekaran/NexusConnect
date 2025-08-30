'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import type { Job } from '@/lib/types';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { Briefcase, MapPin } from 'lucide-react';

export function JobFeed() {
  const { userProfile } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile || !userProfile.connections?.length) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'jobs'),
      where('postedById', 'in', [...userProfile.connections, userProfile.id]),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Job)
      );
      setJobs(jobsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userProfile]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
        <h3 className="text-xl font-semibold">No jobs in your network yet</h3>
        <p className="text-muted-foreground mt-2">
          When people in your network post jobs, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-1">
              <Briefcase className="h-4 w-4" />
              <span>{job.company}</span>
            </CardDescription>
            <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {job.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <div>
              <p className="text-xs text-muted-foreground">Posted by {job.postedBy}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(job.createdAt.toDate(), { addSuffix: true })}
              </p>
            </div>
             <Badge variant="secondary">View</Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
