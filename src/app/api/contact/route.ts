import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { render } from '@react-email/components';
import ContactEmail from '@/components/emails/ContactEmail';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message } = await request.json();

    console.log('Received contact form:', { name, email, phone, service });

    // Using React Email template
    const emailHtml = await render(
      React.createElement(ContactEmail, { name, email, phone, service, message })
    );

    console.log('Email HTML rendered successfully');

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev', 
      to: process.env.EMAIL_TO || 'your-email@example.com',
      subject: `New Contact Request - ${service}`,
      html: emailHtml,
    });

    console.log('Email sent successfully:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}