import { useHooks } from "@/components/providers/web3";
//  useHooks calls setupHooks
//  setupHooks(web3, provider) => {userAccount, getNetwork}
//  getUserCourses import getUserCoursesHook

export const useUserCoursesHook = () => {
    return useHooks((hooks) => {
        return hooks.getUserCourses()
    })
}