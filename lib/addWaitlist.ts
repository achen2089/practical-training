'use server';
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";

export async function addWaitlist(email: string) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { error } = await supabase.from('waitlist').insert({ email }).single();
    if (error) {
        console.log("Error occurred while submitting the form: ", error);
    } else {
        console.log("It's confirmed you're on the waitlist 🚀!");
    }
}
