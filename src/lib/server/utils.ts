import nodemailer from 'nodemailer';
import fs from 'node:fs/promises';

import { EMAIL_SMTP_PASS, EMAIL_SMTP_USER } from '$env/static/private';

export const cookie_options = {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 86400, //one day
} as const;


// You are encouraged to change the code generation logic to suit your needs
export function generate_code_and_ttl(): { code: number; ttl: Date } {
    const digits = 6;
    const time = 10; // in minutes
    const code = Math.floor(
        Math.pow(10, digits - 1) + Math.random() * (Math.pow(10, digits) - Math.pow(10, digits - 1))
    );
    const ttl = new Date(Date.now() + time * 60 * 1000); // 10 minutes from now
    return { code, ttl };
}


// You are encouraged to change the code generation logic to suit your needs
type SendEmailParams = {
	to: string;
	subject: string;        // template string
	textPath: string;
	htmlPath: string;
	data?: Record<string, string>;
};

export async function sendEmail({
	to,
	subject,
	textPath,
	htmlPath,
	data = {}
}: SendEmailParams) {
	const render = (tpl: string) =>
		tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => data[k] ?? '');

	const [textTpl, htmlTpl] = await Promise.all([
		fs.readFile(textPath, 'utf8'),
		fs.readFile(htmlPath, 'utf8')
	]);

	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: EMAIL_SMTP_USER!,
			pass: EMAIL_SMTP_PASS!
		}
	});

	return transporter.sendMail({
		from: `"Verification" <${EMAIL_SMTP_USER!}>`,
		to,
		subject: render(subject),
		text: render(textTpl),
		html: render(htmlTpl)
	});
}