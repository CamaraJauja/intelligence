import Link from "next/link";

export default function Navbar () {
    return (
        <nav className="none bg-background lg:block lg:w lg:h-screen lg:p-md" style={{"--w-lg": "300px", "--mnw-lg": "300px"}}>
            <div></div>
            <ul className="flex flex-col gap-md">
                <Link href={'/'} className="flex items-center gap-sm w-full py-md px-sm">Dashboard</Link>
                <Link href={'/'} className="flex items-center gap-sm w-full py-md px-sm">Análisis del sector</Link>
                <Link href={'/'} className="flex items-center gap-sm w-full py-md px-sm">Análisis geográfico</Link>
                <Link href={'/'} className="flex items-center gap-sm w-full py-md px-sm">Explorador de datos</Link>
            </ul>
        </nav>
    )
}