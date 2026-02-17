import { User_Model } from "./models";

export async function deleteUser(email: string) {
    await User_Model.deleteOne({ email });
}