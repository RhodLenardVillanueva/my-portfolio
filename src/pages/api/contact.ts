import type { NextApiRequest, NextApiResponse } from 'next';

// Email configuration - add your email service credentials to .env.local
// For Resend: RESEND_API_KEY=re_xxxxx
// For SMTP: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

type ContactData = {
  name: string;
  email: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body as ContactData;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Option 1: Using Resend (recommended - free tier available)
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>', // Change this after verifying your domain
          to: process.env.CONTACT_EMAIL || 'villanuevarhodlenard@gmail.com',
          subject: `New Contact Form Message from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
          reply_to: email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend error:', errorData);
        return res.status(500).json({ error: 'Failed to send email' });
      }

      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  }

  // No email service configured - just log and return success
  console.log('Contact form submission (no email service configured):', { name, email, message });
  return res.status(200).json({ 
    success: true, 
    message: 'Message received (email notification not configured)',
    note: 'Add RESEND_API_KEY or SMTP settings to enable email notifications'
  });
}
