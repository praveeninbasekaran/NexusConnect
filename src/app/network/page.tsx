import { AppLayout } from '@/components/layout/app-layout';
import { NetworkList } from './network-list';

export default function NetworkPage() {
  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">My Network</h1>
          <p className="text-muted-foreground">
            People you are connected with on NexusConnect.
          </p>
        </header>
        <NetworkList />
      </main>
    </AppLayout>
  );
}
