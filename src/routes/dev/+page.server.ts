import { MongoClient } from 'mongodb';
import { SECRET_MONGODB_URI, ADMIN_PASS } from "$env/static/private";
import type { Actions } from './$types';

export const actions: Actions = {
    access: async ({ request }) => {
        const formData = await request.formData();
        const password = formData.get("password") as string;   

        // Simple return on password mismatch
        if (password !== ADMIN_PASS) {
            return { error: 'ACCESS DENIED' };
        }

        const client = new MongoClient(SECRET_MONGODB_URI);

        try {
            await client.connect();
            const db = client.db(); 

            const collections = await db.listCollections().toArray();
            const allData: Record<string, any[]> = {};

            for (const col of collections) {
                const collectionName = col.name;
                const documents = await db.collection(collectionName).find({}).toArray();

                allData[collectionName] = documents.map(doc => ({
                    ...doc,
                    _id: doc._id.toString()
                }));
            }

            return {
                databaseContents: allData,
                viewData: true
            };

        } catch (e) {
            return { 
                error: "DATABASE CONNECTION ERROR" 
            };
        } finally {
            await client.close();
        }
    }
};
