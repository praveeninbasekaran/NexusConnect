
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building } from 'lucide-react';
import { RoleProvider, useRole } from '@/hooks/use-role';

const EmployerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pink-500 mb-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 11.55l-2-2-7 7V22h14v-9.45l-7-7zM12 2c-3.14 0-6 2.64-6 6h12c0-3.36-2.86-6-6-6zm-3.5 10c.83 0 1.5.67 1.5 1.5S9.33 15 8.5 15 7 14.33 7 13.5 7.67 12 8.5 12zM15.5 12c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S14 14.33 14 13.5s.67-1.5 1.5-1.5z"/>
    </svg>
)

const JobSeekerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.38 0 2.5 1.12 2.5 2.5S13.38 10 12 10 9.5 8.88 9.5 7.5 10.62 5 12 5zm0 14.2c-2.7 0-5.83-1.63-7.5-3.53.03-2.73 3.51-4.22 7.5-4.22s7.47 1.49 7.5 4.22c-1.67 1.9-4.8 3.53-7.5 3.53z"/>
    </svg>
)

function RoleSelectionPage({ onSelectRole }: { onSelectRole: (role: 'job-seeker' | 'employer') => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900">Welcome to <span className="text-primary">NexusConnect</span></h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Your professional network, your career opportunities. Choose your path to get started.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card 
          onClick={() => onSelectRole('job-seeker')}
          className="shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer p-6"
        >
          <CardHeader className="items-center text-center">
             <JobSeekerIcon />
            <CardTitle className="text-2xl font-bold">I'm a Job Seeker</CardTitle>
            <CardDescription className="text-base mt-2">Discover new opportunities and grow your career by connecting with your network.</CardDescription>
          </CardHeader>
        </Card>
        <Card 
          onClick={() => onSelectRole('employer')}
          className="shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer p-6"
        >
          <CardHeader className="items-center text-center">
            <EmployerIcon />
            <CardTitle className="text-2xl font-bold">I'm an Employer</CardTitle>
            <CardDescription className="text-base mt-2">Find the best talent for your team by sharing your job openings with your network.</CardDescription>
          </CardHeader>
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
