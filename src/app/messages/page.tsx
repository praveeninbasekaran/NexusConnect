import { AppLayout } from '@/components/layout/app-layout';
import { ChatClient } from './chat-client';
import { Card } from '@/components/ui/card';

export default function MessagesPage() {
  return (
    <AppLayout>
      <main className="p-4 md:p-6 h-[calc(100vh-theme(spacing.12))] md:h-[calc(100vh-theme(spacing.12))]">
        <Card className="h-full w-full flex flex-col shadow-lg">
          <ChatClient />
        </Card>
      </main>
    </AppLayout>
  );
}
