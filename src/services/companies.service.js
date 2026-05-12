import { db } from "@/libs/supabase";

export const getCompaniesAll = async () => {
    try {
        const { data, error } = await db
            .from('companies')
            .select('*')
        
        if (error) throw new Error(error);
        
        return data;

    } catch (error) {
        console.error(error);
    }
} 