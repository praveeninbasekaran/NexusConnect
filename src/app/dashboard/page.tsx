
import { AppLayout } from '@/components/layout/app-layout';
import { JobFeed } from "./job-feed";

export default function DashboardPage() {
  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Job Feed</h1>
          <p className="text-muted-foreground">
            Recently posted jobs from your network.
          </p>
        </header>
        <JobFeed />
      </main>
    </AppLayout>
  );
}
