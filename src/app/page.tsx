'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.push('/dashboard');
    }
  }, [loading, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
       <Loader2 className="h-8 w-8 animate-spin" />
    </main>
  );
}
