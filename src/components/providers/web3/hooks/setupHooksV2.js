import { useAccountProviderHookName } from "@/components/providers/web3/hooks/useAccountProvider"

const DEFAULT_HOOKS = {
    getAccountHookV2: () => ({ account: null })
}

export const setupHooksV2 = (web3) => {

    if (!web3) { return DEFAULT_HOOKS }

    return {
        getAccountHookV2: useAccountProviderHookName(web3)
    }
}

// getAccountHookV2: (web3) => {
//     return {
//         accountGet: web3 ? "User Has Account - accountGet" : "null - accountGet"
//     }
// }
