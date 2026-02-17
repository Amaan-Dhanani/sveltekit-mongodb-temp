import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
		cookies.delete("auth-token", { path: '/' });
		throw redirect(301, "/");
};
