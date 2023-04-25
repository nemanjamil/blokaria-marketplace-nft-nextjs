import { useHooks } from "@/components/providers/web3";

export const
    useManagedCoursesHookName = (...args) => {
        return useHooks((hooks) => {
            let m = hooks.useManagedCourses(...args)
            console.log('MMMM', m);

            return m;
        })
    }