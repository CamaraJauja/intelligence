import { getCompaniesAll } from "@/services/companies.service";
import { useCallback, useEffect, useState } from "react"

export const useCompany = () => {

    const [ companies, setCompanies ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const fetchCompanies = useCallback(async () => {

        if (companies.length > 0) return;

        try {
            setLoading(true);
            const data = await getCompaniesAll();
            setCompanies(data || []);
        } catch (error) {
            console.error(error);
            setError(error)
        } finally {
            setLoading(false);
        }

    }, [])

    useEffect(() => {
        if (companies.length > 0) return;
        fetchCompanies();
    }, [fetchCompanies])

    return {
        companies,
        loadingCompany: loading,
        errorCompany: error,
        refreshCompany: fetchCompanies
    }

}