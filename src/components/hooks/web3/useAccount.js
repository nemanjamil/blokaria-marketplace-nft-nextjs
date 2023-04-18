import { useHooks } from "@/components/providers/web3";

export const useAccountHook = () => {
    return useHooks((hooks_cb) => {
        console.log('hooks_cb_3', hooks_cb);

        return hooks_cb.useAccount()
    })
}