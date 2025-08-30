
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, ArrowRight } from 'lucide-react';
import { RoleProvider, useRole } from '@/hooks/use-role';

function RoleSelectionPage({ onSelectRole }: { onSelectRole: (role: 'job-seeker' | 'employer') => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-foreground">Welcome to NexusConnect</h1>
        <p className="text-xl text-muted-foreground mt-4">Your professional network, redefined.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card 
          onClick={() => onSelectRole('job-seeker')}
          className="shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <CardHeader className="items-center text-center">
            <Briefcase className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Job Seeker</CardTitle>
            <CardDescription className="text-base">Discover opportunities from your professional network.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg">
              Find a Job <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
        <Card 
          onClick={() => onSelectRole('employer')}
          className="shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <CardHeader className="items-center text-center">
            <Users className="h-12 w-12 text-accent mb-4" />
            <CardTitle className="text-2xl">Employer</CardTitle>
            <CardDescription className="text-base">Disseminate job opportunities to your professional network.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg" variant="secondary">
              Post a Job <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function HomePageContent() {
  const { role, setRole } = useRole();
  
  if (!role) {
    return <RoleSelectionPage onSelectRole={setRole} />;
  }

  return (
      <AppLayout>
        {role === 'job-seeker' && <DashboardPage />}
        {role === 'employer' && <PostJobPage />}
      </AppLayout>
  );
}

// These are placeholders for the actual pages to avoid prop-drilling issues
// and to decide which page to show based on the role.
import DashboardPage from './dashboard/page';
import PostJobPage from './post-job/page';

export default function HomePage() {
    return (
      <RoleProvider>
        <HomePageContent />
      </RoleProvider>
    );
}
