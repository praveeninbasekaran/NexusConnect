
import { PostJobForm } from './post-job-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLayout } from '@/components/layout/app-layout';

export default function PostJobPage() {
  return (
    <AppLayout>
      <main className="p-4 md:p-8 flex justify-center items-start">
        <Card className="w-full max-w-2xl shadow-lg">
           <CardHeader>
            <CardTitle className="text-3xl">Post a New Job</CardTitle>
            <CardDescription>Share an opportunity with your network.</CardDescription>
          </CardHeader>
          <CardContent>
            <PostJobForm />
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
