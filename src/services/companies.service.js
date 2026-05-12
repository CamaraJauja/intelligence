import { db } from "@/libs/supabase";

export const getCompaniesAll = async () => {
    try {
        const { data, error } = await db
            .from('companies')
            .select('*')
            .order('id', { ascending: true })
        
        if (error) throw new Error(error);
        
        return data;

    } catch (error) {
        console.error(error);
    }
} 

export const createCompany = async (payload) => {

    try {

        /* =========================
            VALIDATIONS
        ========================= */

        if (!payload.ruc) {
            throw new Error('El RUC es obligatorio');
        }

        if (payload.ruc.length !== 11) {
            throw new Error('El RUC debe tener 11 dígitos');
        }

        if (!payload.name) {
            throw new Error('El nombre es obligatorio');
        }

        /* =========================
            CLEAN DATA
        ========================= */

        const companyData = {
            ruc: payload.ruc.trim(),
            name: payload.name.trim(),
            legal_rep: payload.legal_rep?.trim() || null,
            sector: payload.sector || null,
            descr: payload.descr?.trim() || null,
            company_type: payload.company_type || null,
            phone: payload.phone?.trim() || null,
            email: payload.email?.trim() || null,
            is_active: payload.is_active ?? true,
            district: payload.district || null,
            province: payload.province || null,
            region: payload.region || null,
            address: payload.address?.trim() || null,
            updated_at: new Date().toISOString()
        };

        /* =========================
            INSERT
        ========================= */

        const { data, error } = await db
            .from('companies')
            .insert([companyData])
            .select()
            .single();

        if (error) {

            /* =========================
                DUPLICATE RUC
            ========================= */

            if (error.code === '23505') {
                throw new Error('El RUC ya existe');
            }

            throw error;
        }

        return {
            ok: true,
            data
        };

    } catch (error) {

        console.error(error);

        return {
            ok: false,
            message: error.message || 'Error al registrar empresa'
        };

    }

};