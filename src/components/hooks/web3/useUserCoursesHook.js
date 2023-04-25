import { useHooks } from "@/components/providers/web3";
// 1. useHooks pozova setupHooks sa parametrima { web3, provider, contract } koji storuje variable { getNetwork, getUserCourses, useAccount }
// 2. setupHooks({ web3, provider, contract })
// 3. setupHooks ima vrednosti { getNetwork, getUserCourses, useAccount }
// 4. hooks poziva jednu od varijabli getUserCourses

export const useUserCoursesHook = (...args) => {
    return useHooks((hooks) => {
        // console.log('hooks', hooks);
        // getNetwork
        // getUserCourses
        // useAccount
        return hooks.getUserCourses(...args)
    })
}