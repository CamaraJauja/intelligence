'use client';

import Cards from "@/components/Cards";
import Table from "@/components/Table";
import { useDB } from "@/context/DBContext";
import { useMemo, useState } from "react";

export default function Home () {

    const { company, loadingCompany, errorCompany } = useDB();

    const totalCompanies = company.length;

    /* =========================
        COMPANIES BY SECTOR
    ========================= */

    const sectorMap = {};

    company.forEach(c => {

        const sector = c.sector || 'Sin sector';

        if (!sectorMap[sector]) {
            sectorMap[sector] = 0;
        }

        sectorMap[sector]++;

    });

    const sectorData = Object.entries(sectorMap)
        .map(([name, total]) => ({
            name,
            total
        }))
        .sort((a, b) => b.total - a.total);

    /* =========================
        COMPANIES BY DISTRICT
    ========================= */

    const districtMap = {};

    company.forEach(c => {

        const district = c.district || 'Sin distrito';

        if (!districtMap[district]) {
            districtMap[district] = 0;
        }

        districtMap[district]++;

    });

    const districtData = Object.entries(districtMap)
        .map(([name, total]) => ({
            name,
            total
        }))
        .sort((a, b) => b.total - a.total);

    return (
        
        <div className="w m-auto flex flex-col gap-md" style={{"--mxw": "90%"}}>
        
            <div className="w-full flex flex-col items-center justify-between gap-md lg:flex-row">
                <h1>Resumen Ejecutivo</h1>
                <div className="flex items-center gap-md">
                    <button className="px-md py-md">Últimos 90 días</button>
                    <button className="px-md py-md bg-background">Exportar PDF</button>
                </div>
            </div>

            <Cards company={company} />

            <div className="flex flex-col gap-md lg:flex-row">
                <div className="w-full border bg-surface p-md">
                    <h3 className="mb-md">Empresas por sector</h3>
                    <ul className="flex flex-col gap-md">
                        {sectorData.map(sector => (
                            <li key={sector.name} className="w-full flex items-center gap-md">
                                <p className="w-full">{sector.name}</p>
                                <progress className="w-full" value={sector.total} max={totalCompanies}/>
                                <p className="w flex justify-end" style={{"--w": "180px"}}>{sector.total}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full border bg-surface p-md">
                    <h3 className="mb-md">Empresas por distrito</h3>
                    <ul className="flex flex-col gap-md">
                        {districtData.map(district => (
                            <li key={district.name} className="w-full flex items-center gap-md">
                                <p className="w-full text-nowrap">{district.name}</p>
                                <progress className="w-full" value={district.total} max={totalCompanies}/>
                                <p className="w flex justify-end" style={{"--w": "180px"}}>{district.total}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Table company={company} />
        
        </div>

    )
}