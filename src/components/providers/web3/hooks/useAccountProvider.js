import { useEffect, useState } from "react";
import useSWR from 'swr'

const adminAdresses = {
    "0x9137cf5279ae30000061b0411653a30d80db026a31e8ecfc6fa4d8d327c1932a": true  // Ganache Account and Keccak256 https://emn178.github.io/online-tools/keccak_256.html
}

export const handler = (web3, provider) => () => {

    const [account, setAccount] = useState();

    const { data, mutate, ...rest } = useSWR(() => {
        return web3 ? "web3/accounts" : null
    },
        async () => {
            const accounts = await web3.eth.getAccounts();
            return accounts[0];

        })


    // ovo smo zamenili sa swrResponse
    // useEffect((() => {
    //     const getAccount = async () => {
    //         const accounts = await web3.eth.getAccounts();
    //         console.log('accounts X', accounts);
    //         setAccount(accounts[0])

    //     }
    //     web3 && getAccount();
    // }), [web3])

    // useEffect(() => {
    //     window.ethereum &&
    //         window.ethereum.on("accountsChanged", (accounts) => {
    //             setAccount(accounts[0] ?? null)
    //         })
    // }, [])

    useEffect(() => {
        provider &&
            provider.on("accountsChanged", (accounts) => {
                mutate(accounts[0] ?? null)
            })
    }, [provider])

    // useEffect(() => {
    //     provider &&
    //         provider.on("accountsChanged", (accounts) => {
    //             setAccount(accounts[0] ?? null)
    //         })
    // }, [provider])

    if (data) {
        console.log('web3.utils.keccak256(data)', web3.utils.keccak256(data));
    }


    return {
        account: {
            data,
            isAdmin: (data && adminAdresses[web3.utils.keccak256(data)]) ?? false,
            mutate,
            ...rest
        }
    }
}


export const useAccountProvider = (web3) => () => {
    return {
        accountProvider: web3 ? "Test Account Provider_2" : "null - Provider_2"
    }
}
export const useAccountProviderHookName = (web3) => () => {
    return {
        accountProviderHook: web3 ? "Test Account Provider_3 Hook" : "null - Provider_3 Hook"
    }
}