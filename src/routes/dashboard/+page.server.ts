import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { authenticate } from "$lib/server/authenticate";
import { User_Model } from "$lib/server/models";

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        const id = authenticate(cookies);
        
        const user = id ? await User_Model.findById(id).select("name").lean() : null;

        if (!user) {
           throw redirect(303, "/logout");
        }

        const trimmedName = user.name?.trim() || "";
        const firstName = trimmedName.split(' ')[0];

        const greeting = (firstName && firstName.length <= 12) 
            ? `Hi, ${firstName}!` 
            : "Hey there!";

        return { greeting };

    } catch (error) {
        if (error) {
           return { error};
        }

        console.error("Load error:", error);
        return { 
            error: "Something went wrong fetching your profile." 
        };
    }
};
