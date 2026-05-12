'use client'
import { businessSectorsPeru, distrit, taxpayerTypesPeru } from "@/config";
import { useDB } from "@/context/DBContext";
import { createCompany } from "@/services/companies.service";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page () {

    const { addCompany } = useDB();
    const router = useRouter();

    const [ form, setForm ] = useState({
        ruc: '',
        name: '',
        legal_rep: '',
        sector: '',
        descr: '',
        company_type: '',
        phone: '',
        email: '',
        is_active: true,
        district: '',
        province: '',
        region: '',
        address: ''
    })

    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        if (!form.ruc || !form.name || !form.legal_rep || !form.company_type) return toast.warning('Alerta', { description: 'Completa los campos necesarios.' });
        try {
            setLoading(true)
            const data = await createCompany(form);
            if (!data.ok) return toast.warning('Alerta', { description: data.message });
            addCompany(data.data);
            toast.success('Éxito', { description: 'Se registró exitosamente la empresa' })
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false);
            setForm({
                ruc: '',
                name: '',
                legal_rep: '',
                sector: '',
                descr: '',
                company_type: '',
                phone: '',
                email: '',
                is_active: true,
                district: '',
                province: '',
                region: '',
                address: ''
            })
        }
    }

    return (
        <div className="w m-auto lg:w" style={{"--mxw": "100%", "--w-lg": "60%"}}>
            <div className="w-full flex gap-md items-center mb-lg">
                <button className="w h" style={{"--w": "50px", "--h": "50px", "--mnw": "50px"}} onClick={() => router.back()}><IconChevronLeft/></button>
                <h1>Agregar nueva empresa</h1>
            </div>
            <div className="w-full flex flex-col gap-md">
                <div className="w-full">
                    <label className="block mb-sm" htmlFor="ruc">RUC</label>
                    <input type="text" className="w-full h px-sm" style={{"--h": "50px"}} name="ruc" id="ruc"  maxLength={11} placeholder="Ejm: 21028596324" value={form.ruc} onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label className="block mb-sm" htmlFor="name">Nombre de la empresa</label>
                    <input type="text" className="w-full h px-sm" style={{"--h": "50px"}} name="name" id="name" value={form.name} placeholder="Ejm: Empresa Nueva Vida SAC" onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label className="block mb-sm" htmlFor="legal_rep">Representante legal</label>
                    <input type="text" className="w-full h px-sm" style={{"--h": "50px"}} name="legal_rep" id="legal_rep" value={form.legal_rep} placeholder="Ejm: Juan Fabian Perez Hilario" onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label className="block mb-sm" htmlFor="sector">Sector</label>
                    <select className="w-full h px-sm" style={{"--h": "50px"}} name="sector" id="sector" value={form.sector} onChange={handleChange}>
                        <option value={''} hidden>Selecciona sector</option>
                        {businessSectorsPeru.map((sector) => (
                            <option key={sector} value={sector}>{sector}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    <label className="block mb-sm" htmlFor="descr">Descripción</label>
                    <input type="text" className="w-full h px-sm" style={{"--h": "50px"}} name="descr" id="descr" value={form.descr} placeholder="Ejm: Pesca Explotacion De Criaderos De Peces" onChange={handleChange} />
                </div>
                <div className="w-full flex gap-md items-center">
                    <div className="w-full">
                        <label className="block mb-sm" htmlFor="company_type">Tipo de empresa</label>
                        <select className="w-full h px-sm" style={{"--h": "50px"}} name="company_type" id="company_type" value={form.company_type} onChange={handleChange}>
                            <option value={''} hidden>Selecciona tipo de empresa</option>
                            {taxpayerTypesPeru.map((tax) => (
                                <option key={tax.key} value={tax.key}>{tax.value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-sm" htmlFor="phone">Número de teléfono</label>
                        <input type="text" className="w-full h px-sm" style={{"--h": "50px"}} maxLength={9} name="phone" id="phone" value={form.phone} placeholder="Ejm: 21028596324" onChange={handleChange} />
                    </div>
                    <div className="w-full">
                        <label className="block mb-sm" htmlFor="email">Correo Electrónico</label>
                        <input type="text" className="w-full h px-sm" style={{"--h": "50px"}} name="email" id="email" value={form.email} placeholder="Ejm: 21028596324" onChange={handleChange} />
                    </div>
                </div>
                <div className="w-full">
                    <label className="block mb-sm" htmlFor="address">Dirección</label>
                    <input type="text" className="w-full h px-sm" style={{"--h": "50px"}} name="address" id="address" value={form.address} placeholder="Ejm: Jr. Junin 120, Jauja, Jauja, Junín" onChange={handleChange} />
                </div>
                <div className="w-full flex gap-md items-center">
                    <div className="w-full">
                        <label className="block mb-sm" htmlFor="district">Distrito</label>
                        <select className="w-full h px-sm" style={{"--h": "50px"}} name="district" id="district" value={form.district} onChange={handleChange}>
                            <option value={''} hidden>Selecciona distrito</option>
                            {distrit.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-sm" htmlFor="province">Provincia</label>
                        <select className="w-full h px-sm" style={{"--h": "50px"}} name="province" id="province" value={form.province} onChange={handleChange}>
                            <option value={''} hidden>Selecciona provincia</option>
                            <option value={'Jauja'} selected>Jauja</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className="block mb-sm" htmlFor="region">Region</label>
                        <select className="w-full h px-sm" style={{"--h": "50px"}} name="region" id="region" value={form.region} onChange={handleChange}>
                            <option value={''} hidden>Selecciona provincia</option>
                            <option value={'Junín'} selected>Junín</option>
                        </select>
                    </div>
                </div>
                <div className="w-full">
                    <button className="w-full h bg-primary text-on-primary" style={{"--h": "50px"}} onClick={handleSubmit} disabled={loading}>{loading ? 'Agregando...' : 'Agregar empresa'}</button>
                </div>
            </div>
        </div>
    )
}