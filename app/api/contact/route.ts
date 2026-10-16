import { NextResponse } from 'next/server';
import { EMAIL_FROM, TEAM_INBOX, escapeHtml, getResend } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email, message, phone } = await request.json();

    if (
      typeof name !== 'string' || !name.trim() ||
      typeof email !== 'string' || !email.trim() ||
      typeof message !== 'string' || !message.trim() ||
      (phone !== undefined && (typeof phone !== 'string' || phone.length > 40))
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = getResend();
    if (!client) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const data = await client.emails.send({
      from: EMAIL_FROM,
      to: TEAM_INBOX,
      subject: `Nova Mensagem de ${name.replace(/[\r\n]+/g, ' ')} (Website)`,
      replyTo: email,
      html: `
        <h2>Nova Mensagem via Formulário ElevaOps</h2>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <br/>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
