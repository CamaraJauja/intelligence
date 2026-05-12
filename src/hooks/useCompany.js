import { getCompaniesAll } from "@/services/companies.service";
import { useCallback, useEffect, useState } from "react"

export const useCompany = () => {

    const [ companies, setCompanies ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const fetchCompanies = useCallback(async () => {

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

    const addCompany = (newCompany) => {
        setCompanies(prev => [
            newCompany,
            ...prev
        ])
    };

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies])

    return {
        companies,
        loadingCompany: loading,
        errorCompany: error,
        refreshCompany: fetchCompanies,
        addCompany
    }

}