'use client';

import { useMemo, useState } from 'react';
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import 'react-loading-skeleton/dist/skeleton.css'
export default function Table ({ company }) {
    
    const ITEMS_PER_PAGE = 10;
    const [page, setPage] = useState(1);
    
    const totalPages = Math.ceil(company.length / ITEMS_PER_PAGE);
    
    const paginatedCompanies = useMemo(() => {
    
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
    
        return company.slice(start, end);
    
    }, [company, page]);

    return (
        <div className="w-full border bg-surface" style={{"overflowX": "scroll"}}>
            <div className="w-full flex items-center justify-between" style={{borderBottom: '1px solid #c6c6cd'}}>
                <span className="w h flex items-center justify-center font-medium" style={{"--w": "50px", "--mnw": "50px","--h": "50px"}}>ID</span>
                <span className="w-full h flex items-center justify-center font-medium" style={{"--h": "50px"}}>RUC</span>
                <span className="w-full h flex items-center justify-center font-medium" style={{"--h": "50px"}}>Empresa</span>
                <span className="w-full h flex items-center justify-center font-medium" style={{"--h": "50px"}}>Sector</span>
                <span className="none lg:block w-full h flex items-center justify-center font-medium" style={{"--h": "50px"}}>Ubicación</span>
                <span className="w-full h flex items-center justify-center font-medium" style={{"--h": "50px"}}>Tipo</span>
                <span className="w-full h flex items-center justify-center font-medium" style={{"--h": "50px"}}>Estado</span>
            </div>
            <div className="w-full flex flex-col">
                {paginatedCompanies.map((cpy) => (
                    <div key={cpy.id} className="w-full flex items-center justify-between" style={{borderBottom: '1px solid #c6c6cd'}}>
                        <span className="w h flex items-center justify-center font-medium text-sm py-md" style={{"--w": "50px", "--mnw": "50px"}}>{cpy.id + 1}</span>
                        <span className="w-full h flex items-center justify-center font-medium text-sm py-md">{cpy.ruc}</span>
                        <span className="w-full h flex items-center justify-center font-medium text-sm py-md">{cpy.name}</span>
                        <span className="w-full h flex items-center justify-center font-medium text-sm py-md">{cpy.sector}</span>
                        <span className="none lg:block w-full h flex items-center justify-center font-medium text-sm py-md">{cpy.address ? cpy.address : `${cpy.district || ''} ${cpy.province}, ${cpy.region}`}</span>
                        <span className="w-full h flex items-center justify-center font-medium text-sm py-md">{cpy.company_type}</span>
                        <span className="w-full h flex items-center justify-center font-medium text-sm py-md">{cpy.is_active ? 'Activo' : 'Inactivo'}</span>
                    </div>
                ))}
            </div>
            <div className="w-full py-sm px-md flex items-center justify-between">
                <p>Página {page} de {totalPages}</p>
                <div className="flex items-center">
                    <button className="w h" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}} disabled={page === 1} onClick={() => setPage(prev => prev - 1)}><IconChevronLeft/></button>
                    {Array.from({ length: totalPages }, (_, index) => {
                        const currentPage = index + 1;
                        return (
                            <button key={index} className={`w h ${page === currentPage ? 'bg-primary text-on-primary' : ''}`} style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}} onClick={() => setPage(currentPage)}>{currentPage}</button>
                        )
                    })}
                    <button className="w h" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}} disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}><IconChevronRight/></button>
                </div>
            </div>
        </div>
    )
}