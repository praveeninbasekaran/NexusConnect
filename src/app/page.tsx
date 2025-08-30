'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Please provide an auth token.',
      });
      return;
    }
    setLoading(true);
    try {
      await signInWithToken(token);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: 'Could not sign in with the provided token. Please check the token and try again.',
      });
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">NexusConnect</CardTitle>
          <CardDescription className="text-center">
            Your personal job network. Sign in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Auth Token</Label>
              <Input
                id="token"
                type="password"
                placeholder="Enter your custom auth token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
