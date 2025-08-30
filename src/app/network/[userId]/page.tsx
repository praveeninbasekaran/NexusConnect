import { AppLayout } from '@/components/layout/app-layout';
import { ProfileDetails } from './profile-details';

export default function UserProfilePage({ params }: { params: { userId: string } }) {
  return (
    <AppLayout>
      <main className="p-4 md:p-8">
        <ProfileDetails userId={params.userId} />
      </main>
    </AppLayout>
  );
}
