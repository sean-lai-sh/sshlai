import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
    name: string,
    email: string,
    company: string,
    msg: string,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, msg} = body as ContactFormData;

    if (!name || !email || !company || !msg) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'contact form <forms@seanlai.co>',
      to: 'seanlai221@gmail.com',
      subject: 'New contact form submission',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>company:</strong> ${company}</p>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) { 
    console.error(error);
    if (error instanceof Error) {
        return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
    }else{
        return NextResponse.json({ success: false, error: 'Internal Server Error with unknown causes' }, { status: 500 });
    }
  }
}
