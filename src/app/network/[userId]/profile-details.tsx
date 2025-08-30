'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';
import { generateProfileRecommendation } from '@/app/actions/user.actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ProfileDetails({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile({ id: docSnap.id, ...docSnap.data() } as UserProfile);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [userId]);

  const handleGetRecommendation = async () => {
    if (!profile) return;
    setIsGenerating(true);
    setRecommendation(null);

    const userProfileString = JSON.stringify({ name: profile.name, bio: profile.bio });
    const networkDataString = JSON.stringify({ connectionCount: profile.connections.length });

    const result = await generateProfileRecommendation(userProfileString, networkDataString);
    if (result.success && result.recommendation) {
      setRecommendation(result.recommendation);
    } else {
        setRecommendation("Sorry, we couldn't generate a recommendation at this time.");
    }
    setIsGenerating(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-32 w-full" />
        <div className="mt-8">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-20 w-full mt-4" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return <p>User not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-primary">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback className="text-3xl">{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl">{profile.name}</CardTitle>
            <CardDescription className="mt-2 text-base">{profile.bio}</CardDescription>
          </div>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Profile Insights</CardTitle>
            <CardDescription>Get AI-powered suggestions to improve this profile.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={handleGetRecommendation} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Generate Recommendation
            </Button>

            {isGenerating && (
                <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing profile...</span>
                </div>
            )}
            
            {recommendation && (
                <Alert className="mt-4">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Recommendation</AlertTitle>
                    <AlertDescription>
                        {recommendation}
                    </AlertDescription>
                </Alert>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
