'use client';

import { useDB } from "@/context/DBContext";

export default function Home () {

    const { company } = useDB();

    const totalCompanies = company.length;

    const activeCompanies = company.filter(c => c.is_active).length;

    const inactiveCompanies = company.filter(c => !c.is_active).length;

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

    /* =========================
        TOP SECTOR
    ========================= */

    const topSector = sectorData[0];

    /* =========================
        TOP DISTRICT
    ========================= */

    const topDistrict = districtData[0];

    return (
        
        <div className="w m-auto flex flex-col gap-md" style={{"--mxw": "90%"}}>
        
            <div className="w-full flex flex-col items-center justify-between gap-md lg:flex-row">
                <h1>Resumen Ejecutivo</h1>
                <div className="flex items-center gap-md">
                    <button className="px-md py-md">Últimos 90 días</button>
                    <button className="px-md py-md bg-background">Exportar PDF</button>
                </div>
            </div>

            <div className="w-full grid grid-2 gap-md lg:grid-4">
                <div className="w-full p-md border bg-surface">
                    <p className="text-sm">Total de registro</p>
                    <h2>{totalCompanies}</h2>
                </div>
                <div className="w-full p-md border bg-surface">
                    <p className="text-sm">Activos vs Inactivos</p>
                    <h2>{activeCompanies} / {inactiveCompanies}</h2>
                </div>
                <div className="w-full p-md border bg-surface">
                    <p className="text-sm">Sector dominante</p>
                    <h2>{topSector?.name || 'N/A'}</h2>
                </div>
                <div className="w-full p-md border bg-surface">
                    <p className="text-sm">Distrito económico</p>
                    <h2>{topDistrict?.name || 'N/A'}</h2>
                </div>
            </div>

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
        
        </div>

    )
}