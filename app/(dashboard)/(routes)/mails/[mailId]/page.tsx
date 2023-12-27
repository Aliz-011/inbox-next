import React from 'react';
import { MailForm } from './_components/mail-form';

const MailIdPage = ({ params }: { params: { mailId: string } }) => {
  return (
    <div className="p-6">
      <MailForm />
    </div>
  );
};

export default MailIdPage;
