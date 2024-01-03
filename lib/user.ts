import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verification?token=${token}`;

  await resend.emails.send({
    from: 'Schubert@assembly.com',
    to: email,
    subject: 'Verify your email address',
    react: EmailTemplate({ firstName: 'John' }),
    html: `<p>Click <a href="${confirmLink}">to confirm your email</a></p>`,
  });
};
