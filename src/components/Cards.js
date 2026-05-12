export default function Cards ({ company }) {
    
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
    )
}