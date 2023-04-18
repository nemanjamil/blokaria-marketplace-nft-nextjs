

import { Navbar, Footer } from "@/components/ui/common"
import { Web3Provider } from "@/components/providers"

export default function BaseLayout({ children }) {
    return (
        <Web3Provider>
            <div className="bg-white">
                < div className="max-w-7xl mx-auto px-4" >
                    <Navbar />
                    <div className="fit">
                        {children}
                    </div>
                </div >
                <Footer />
            </div>
        </Web3Provider>
    )
}