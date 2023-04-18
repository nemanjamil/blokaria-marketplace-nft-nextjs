import { useHooks } from "@/components/providers/web3";
//  useHooks calls setupHooks
//  setupHooks(web3, provider) => {userAccount, getNetwork}
//  getNetwork import getUserNetwork

export const useNetworkHook = () => {
    return useHooks((hooks_cb) => {
        return hooks_cb.getNetwork()
    })
}