import { authenticate } from "$lib/server/authenticate";
import { redirect, type Handle } from "@sveltejs/kit";
import { cookie_options } from "$lib/server/utils";

export const handle: Handle = async ({ event, resolve }) => {
	const is_protected =
		event.url.pathname.startsWith("/dashboard") ||
		event.url.pathname.startsWith("/settings");

	const auth = authenticate(event.cookies);

	if (is_protected && !auth) {
		throw redirect(307, "/logout");
	}

	const response = await resolve(event);
	return response;
};
