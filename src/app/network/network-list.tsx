
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';
import { collection, query, where, onSnapshot, getDocs, documentId } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export function NetworkList() {
  const { userProfile } = useAuth();
  const [connections, setConnections] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile || !userProfile.connections?.length) {
      setLoading(false);
      return;
    }

    const fetchConnections = async () => {
      const q = query(
        collection(db, 'users'),
        where(documentId(), 'in', userProfile.connections)
      );
      const querySnapshot = await getDocs(q);
      const connectionsData = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as UserProfile)
      );
      setConnections(connectionsData);
      setLoading(false);
    };

    fetchConnections();
  }, [userProfile]);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }
  
  if (connections.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <h3 className="text-xl font-semibold">Your network is empty</h3>
            <p className="text-muted-foreground mt-2">
                Connect with people to build your professional network.
            </p>
        </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {connections.map((person) => (
        <Link href={`/network/${person.id}`} key={person.id} className="hover:bg-accent hover:text-accent-foreground transition-colors rounded-lg">
          <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={person.avatarUrl} alt={person.name} />
                <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{person.name}</CardTitle>
                <CardDescription className="line-clamp-1">{person.bio}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
