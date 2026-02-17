import type { PageServerLoad, Actions } from "./$types";
import { User_Model } from "$lib/server/models";
import { authenticate } from "$lib/server/authenticate";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const id = authenticate(cookies);
		const user = id ? await User_Model.findById(id).select("name").lean() : null;

		if (!user) {
			 throw redirect(303, "/logout");
		}

		return { name: user.name };
	} catch (error) {
		console.error("Load error:", error);
		return { error: "Something went wrong fetching your profile." };
	}
};

export const actions: Actions = {
	name: async ({ cookies, request }) => {
		const id = authenticate(cookies);
		const data = await request.formData();
		const newName = data.get("name")?.toString();

		if (id && newName) {
			const user = await User_Model.findById(id);
			if (user?.name === newName) {
				return { error: "Your new name must be different from current name" };
			}

			await User_Model.updateOne({ _id: id }, { name: newName });
			return { success: "You have successfully changed your name!" };
		}

		return { error: "You are an invalid user or are missing data." };
	}
};
