import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type ErrorResponse, type LoginResponse, user_exists, type UserWithPassword, type User } from "./utils";
import { SECRET_JWT_KEY } from "$env/static/private";

export async function login_user(
	email: string,
	password: string
): Promise<ErrorResponse | LoginResponse> {

	const dbUser: UserWithPassword | null = await user_exists(email);

	if (!dbUser) {
		return { error: "A user with that email does not exist." };
	}

	const password_is_correct = await bcrypt.compare(password, dbUser.password);
	if (!password_is_correct) {
		return { error: "Password is not correct." };
	}

	const token = jwt.sign({ id: dbUser._id.toString() }, SECRET_JWT_KEY);

	const safeUser: User = {
		email: dbUser.email,
		name: dbUser.name,
		_id: dbUser._id
	};

	return {
		token,
		user: safeUser
	};
}
