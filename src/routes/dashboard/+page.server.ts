import type { PageServerLoad } from "./$types";
import { authenticate } from "$lib/server/authenticate";
import { User_Model } from "$lib/server/models";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        const id = authenticate(cookies);
        const user = id ? await User_Model.findById(id).select("name").lean() : null;

        if (!user) {
           throw redirect(303, "/logout");
        }

        const finalName = user.name.split(' ')[0];
        const greeting = finalName.length <= 12 ? `Hi, ${finalName}!` : "Hey there!";


        return { greeting };
    } catch (error) {
        console.error("Load error:", error);
        return { error: "Something went wrong fetching your profile." };
    }
};