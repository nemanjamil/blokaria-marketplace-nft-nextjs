import { useWeb3 } from "@/components/providers"
import Link from "next/link"
import { Button } from "@/components/ui/common"
import { useRouter } from "next/router"
import { useAccountProvider } from "@/components/providers/web3/hooks/useAccountProvider" // ovaj samo za  Code_1

import { useAccountHook } from "@/components/hooks/web3/useAccount" // ovo je hook

export default function Navbar() {

    const { connect, isLoading, isWeb3Loaded, web3, hooks } = useWeb3()  // web3(Code_1), hooks(Code_2)

    // Code_1
    const _useAccountProvider = useAccountProvider(web3);
    console.log('_useAccountProvider', _useAccountProvider);
    const { accountProvider } = _useAccountProvider();
    console.log('accountProvider', accountProvider);

    // Code_2
    const { accountProviderHook } = hooks.getAccountHookV2();
    console.log('accountProviderHook', accountProviderHook);

    // Code_3
    const { account } = useAccountHook();
    console.log('account', account);

    const { pathname } = useRouter();
    const router = useRouter();
    console.log('isLoading', isLoading);
    console.log('isWeb3Loaded', isWeb3Loaded);


    return (
        <section>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative" aria-label="Global">
                    <div className="flex justify-between">
                        <div>
                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900" >
                                Home
                            </Link>
                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Marketplace
                            </Link>
                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Blogs
                            </Link>
                        </div>
                        <div>
                            <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                                Wishlist
                            </Link>
                            {isLoading ?

                                <Button onClick={connect} disabled={true}>Loading...</Button>
                                : isWeb3Loaded ? account.data ?
                                    <Button variant="purple">Hi There {account.isAdmin && "Admin"}</Button> :
                                    <Button onClick={connect}>Connect</Button> :
                                    <Button
                                        variant="red"
                                        //onClick={() => router.push("https://metamask.io/download/")}
                                        onClick={() => window.open("https://metamask.io/download/", "_blank")}
                                    >
                                        Install MetaMask
                                    </Button>
                            }
                        </div>
                    </div>
                </nav>
            </div>

            {account.data && !pathname.includes("/marketplace") && <div className="flex justify-end sm:px-6 lg:px-8 pt-1">
                <div className="text-white bg-indigo-600 rounded-md p-2">
                    {account.data}
                </div>
            </div>}

            <div>
                <div>accountProvider Code_1: {accountProvider}</div>
                <div>accountProvider Code_2: {accountProviderHook}</div>
                <div>account Code_3: {account.data}</div>
            </div>
        </section>
    )
}