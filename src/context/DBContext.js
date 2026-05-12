'use client';

import { useCompany } from "@/hooks/useCompany";
import { createContext, useContext } from "react";

export const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const company = useCompany();

    const refreshAll = async () => {
        await Promise.all([
            company.refreshCompany()
        ])
    }

    const contextValue = {
        company: company.companies,
        loadingCompany: company.loadingCompany,
        errorCompany: company.errorCompany,
        addCompany: company.addCompany,
        refreshAll
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext);