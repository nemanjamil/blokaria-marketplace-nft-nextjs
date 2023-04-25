import { handler as createUseAccountHook } from "@/components/providers/web3/hooks/useAccountProvider";
import { handler as getUserNetworkHook } from "@/components/providers/web3/hooks/useNetworkProvider";
import { handler as getUserCoursesHook } from "@/components/providers/web3/hooks/useOwnedCouses";
import { handler as getManagedCoursesHook } from "@/components/providers/web3/hooks/useManagedCourses";

export const setupHooks = ({ web3 = null, provider = null, contract = null }) => {
    return {
        useAccount: createUseAccountHook(web3, provider),
        getNetwork: getUserNetworkHook(web3, provider),
        getUserCourses: getUserCoursesHook(web3, contract),
        useManagedCourses: getManagedCoursesHook(web3, contract)
    }
}


// export const setupHooks = (web3) => {
//     return {
//         useAccount: createUseAccount(web3),
//     }
// }