import { handler as createUseAccount } from "@/components/providers/web3/hooks/useAccountProvider";

export const setupHooks = (...dependables) => {
    return {
        useAccount: createUseAccount(...dependables),
    }
}
// export const setupHooks = (web3) => {
//     return {
//         useAccount: createUseAccount(web3),
//     }
// }