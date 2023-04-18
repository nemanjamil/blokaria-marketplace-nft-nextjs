import { handler as createUseAccount } from "@/components/providers/web3/hooks/useAccountProvider";
import { handler as getUserNetwork } from "@/components/providers/web3/hooks/useNetworkProvider";

export const setupHooks = (...dependables) => {
    console.log('getUserNetwork', getUserNetwork(...dependables));
    console.log('createUseAccount', createUseAccount(...dependables));

    return {
        useAccount: createUseAccount(...dependables),
        getNetwork: getUserNetwork(...dependables)
    }
}


// export const setupHooks = (web3) => {
//     return {
//         useAccount: createUseAccount(web3),
//     }
// }