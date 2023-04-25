import { normalizeOwnerCourse } from "@/utils/normalize";
import useSWR from "swr"

export const handler = (web3, contract) => (courses, account) => {

    // console.log('web3_2', web3);
    // console.log('contract_2', contract);
    // console.log('courses_2', courses);
    // console.log('account_2', account);

    const swrRes = useSWR(() =>
        (web3 && contract && account?.data) ? `web3/useOwnedCourses/${account}` : null,
        async () => {

            const ownedCourses = []

            for (let i = 0; i < courses.length; i++) {
                const course = courses[i]

                if (!course.id) { continue }

                //const hexCourseId = web3.utils.asciiToHex(course.id)
                const hexCourseId = web3.utils.utf8ToHex(course.id)

                const courseHash = web3.utils.soliditySha3(  // orderhash
                    { type: "bytes16", value: hexCourseId },
                    { type: "address", value: account.data }
                )

                const ownedCourse = await contract.methods.getCourseByHash(courseHash).call()

                if (ownedCourse.owner !== "0x0000000000000000000000000000000000000000") {
                    const normalized = normalizeOwnerCourse(web3)(course, ownedCourse);
                    ownedCourses.push(normalized)
                }
            }
            return ownedCourses
        }
    )

    return swrRes;

};