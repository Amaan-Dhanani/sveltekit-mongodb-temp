import { superValidate } from "sveltekit-superforms/server";
import { zod4 } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { loginSchema } from "$lib/validation";
import { login_user } from "$lib/server/login";
import { setError } from "sveltekit-superforms/server";
import { cookie_options } from "$lib/server/utils";

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod4(loginSchema));
    return { form };
}

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod4(loginSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { email, password } = form.data;
        const { error } = await login_user(email, password,  event.cookies);

       if (error) {
			setError(form, 'email', error);
			return fail(400, { form });
		}

        throw redirect(303, "/dashboard");
    }
};
