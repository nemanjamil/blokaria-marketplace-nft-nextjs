const { createContext, useContext, useEffect, useState, useMemo } = require("react");
import detectEthereumProvider from "@metamask/detect-provider"
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";
import { setupHooksV2 } from "./hooks/setupHooksV2";


const Web3Context = createContext(null)

export default function Web3Provider({ children }) {

    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isLoading: true
    });

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            if (provider) {
                const web3 = new Web3(provider);
                setWeb3Api({
                    provider,
                    web3,
                    contract: null,
                    isLoading: false
                })
            } else {
                setWeb3Api(apiMiki => ({ ...apiMiki, isLoading: false }))
                console.error("Please Install MetaMask");
            }
        };

        loadProvider();
    }, [])

    const _web3Api = useMemo(() => {
        const { provider, web3 } = web3Api;
        return {
            ...web3Api,
            isWeb3Loaded: web3,
            hooks: setupHooksV2(web3),
            getHooks: () => setupHooks(web3, provider),
            connect: provider ?
                async () => {
                    try {
                        // if (provider !== window.ethereum) {
                        //     console.error('Do you have multiple wallets installed?');
                        // }
                        let requestAccounts = await provider.request({ method: "eth_requestAccounts" })

                        console.log('requestAccounts', requestAccounts);

                        //let  chainId = await web3Api.provider.request({ method: "eth_chainId" })

                    } catch (error) {
                        console.error('Cannot retreive account');
                        location.reload()
                    }
                }
                :
                () => console.log("Can't connect to MetaMask"),
            test: () => console.log('web3Api Hello World')
        }
    }, [web3Api])

    return (
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context)
}
// responsible for retreiving hooks
export function useHooks(cb) {

    console.log("cb_1", cb);

    const { getHooks } = useWeb3();
    const hooks = getHooks();

    console.log("hooks_2", hooks);

    return cb(hooks);
}