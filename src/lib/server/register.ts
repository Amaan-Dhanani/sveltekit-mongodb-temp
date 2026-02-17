import bcrypt from "bcrypt";
import { generate_code_and_ttl, sendEmail } from "./utils";
import path from 'node:path';
import type { Cookies } from "@sveltejs/kit";
import { User_Model } from "./models";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "$env/static/private";

import textTemplate from '$lib/nodemailer/register.txt?raw';
import htmlTemplate from '$lib/nodemailer/register.html?raw';

export async function create_user(
	email: string,
	type: string,
	password: string,
	name: string,
	cookies: Cookies
): Promise<{ error: string }> {

	// Delete user if unverified
	await User_Model.deleteOne({ email, verified: false });

	// If a verified user exists, stop
	const verifiedExists = await User_Model.findOne({ email, verified: true });
	if (verifiedExists) {
		return { error: "A verified user with that email already exists. Try logging in instead." };
	}

	// Do expensive work in parallel
	const [hashed_password, { code, ttl }] = await Promise.all([
		bcrypt.hash(password, 12), //any more and it gets slow
		Promise.resolve(generate_code_and_ttl())
	]);

	const user = new User_Model({
		email,
		type,
		password: hashed_password,
		name,
		code,
		ttl,
		attempts: 0,
		verified: false
	});

	try {
		await user.save();

		// Don't block user creation on email
		 const staticDir = path.resolve(process.cwd(), 'static');
		sendEmail({
			to: email,
			subject: 'Hello {{name}}, your verification code',
			textTpl: textTemplate,
            htmlTpl: htmlTemplate,
			data: { name, code: code.toString() }
		}).catch(console.error);

		// Setting a cookie with JWT token to transfer email between actions. Server use only.
		cookies.set(
			"verify_email",
			jwt.sign({ email }, SECRET_JWT_KEY),
			{
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				path: "/",
			}
		);

		return { error: "" };
	} catch (err) {
		return { error: err?.toString() as string };
	}
}

export async function verify_user(
	code: string,
	cookies: Cookies
): Promise<{ error: string, go_back_btn: boolean }> {
	let email: string;
	try {
		email = (jwt.verify(cookies.get("verify_email")!, SECRET_JWT_KEY) as { email: string }).email;
	} catch (err) {
		// tampered token, expired, or missing
		return { error: "Cookies are required to complete registration because we use them to securely verify your email. Please make sure cookies are enabled in your browser settings and register again. If you're using a browser extension or privacy mode that blocks cookies, temporarily disable it for this site.", go_back_btn: true };
	}

	const user = await User_Model.findOne({ email });
	if (!user) return { error: "Your code probably expired. Please try registering again.", go_back_btn: true };
	if (!user.code) return { error: "This account is already verified. Try logging in instead.", go_back_btn: true };

	if (user.code !== code) {
		// increment attempts
		const attempts = (user.attempts || 0) + 1;

		if (attempts >= 3) {
			await User_Model.deleteOne({ _id: user._id });
			return { error: "Too many incorrect attempts. Please register again.", go_back_btn: true };
		} else {
			await User_Model.updateOne(
				{ _id: user._id },
				{ $set: { attempts } }
			);
			return {
				error: `Incorrect code. You have ${3 - attempts} attempt${3 - attempts === 1 ? '' : 's'} left.`,
				go_back_btn: false
			};
		}
	}

	// correct code, verify user, and delete temporary email cookie
	await User_Model.updateOne(
		{ _id: user._id },
		{
			$set: { verified: true },
			$unset: { code: "", ttl: "", attempts: "" }
		}
	);
	cookies.delete("verify_email", { path: "/" });

	return { error: "", go_back_btn: false };
}

