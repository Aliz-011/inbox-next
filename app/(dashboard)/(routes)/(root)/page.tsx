import { Heading } from '@/components/heading';
import { CardList } from './_components/card-list';
import { InboxList } from './_components/inbox-list';

export default async function Home() {
  return (
    <main className="p-6 space-y-8">
      <Heading
        title="Dashboard"
        description="All the activity will shown here."
      />

      <CardList />
      <InboxList />
    </main>
  );
}
