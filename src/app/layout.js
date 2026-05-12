import { Montserrat } from "next/font/google"
import "@/assets/css/global.css";
import { DBProvider } from "@/context/DBContext";
import Navbar from "@/layout/Navbar";

const montserrat = Montserrat({
    variable: "--font-montserrat-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
    title: 'Intelegencia'
}

export default function RootLayout ({ children }) {
    return (
        <html lang="es" className={`${montserrat.variable}`}>
            <DBProvider>
                <body className="flex bg-surface-high">
                    <main className="w p-md lg:w lg:h-screen" style={{"--w": "100%", "--w-lg": "100dvw", "overflowY": "scroll"}}>{children}</main>
                </body>
            </DBProvider>
        </html>
    )
}