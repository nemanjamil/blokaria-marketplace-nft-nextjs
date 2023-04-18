import { useHooks } from "@/components/providers/web3";

export const useAccountHook = () => {
    return useHooks((hooks_cb) => {
        return hooks_cb.useAccount()
    })
}