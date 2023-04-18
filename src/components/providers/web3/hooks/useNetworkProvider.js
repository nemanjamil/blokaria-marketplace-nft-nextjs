import { useEffect, useState } from "react";
import useSWR from 'swr'

const adminAdresses = {
    "0x9137cf5279ae30000061b0411653a30d80db026a31e8ecfc6fa4d8d327c1932a": true  // Ganache Account and Keccak256 https://emn178.github.io/online-tools/keccak_256.html
}

export const handler = (web3, provider) => () => {


    const { mutate, ...rest } = useSWR(() => {
        return web3 ? "web3/network" : null
    },
        async () => {
            const networkId = await web3.eth.getChainId();
            return networkId;

        })

    useEffect(() => {
        provider &&
            provider.on("chainChanged", (chainId) => {
                mutate(parseInt(chainId, 16))
            })
    }, [provider])


    return {
        network: {
            mutate,
            ...rest
        }
    }
}