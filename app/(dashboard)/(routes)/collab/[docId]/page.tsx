import { prismadb } from '@/lib/database';
import { redirect } from 'next/navigation';
import { DocumentIdClient } from './_components/client';

const DocumentPage = async ({ params }: { params: { docId: string } }) => {
  const document = await prismadb.document.findUnique({
    where: {
      id: params.docId,
    },
  });

  if (document === null || document === undefined) {
    return redirect('/collab');
  }

  return (
    <main className="py-10 px-20">
      <DocumentIdClient data={document} />
    </main>
  );
};

export default DocumentPage;
