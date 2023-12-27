'use client';

import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { Modal } from './modal';

export const SearchModal = () => {
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Hi there" description="What do you looking for?" />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <Separator />
      <Button variant="outline" className="flex items-center gap-2">
        Search
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={false}
      title="Search"
      actionLabel="Search"
      onSubmit={() => {}}
      onClose={() => {}}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
