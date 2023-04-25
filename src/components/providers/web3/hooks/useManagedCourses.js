

import { normalizeOwnerCourse } from "@/utils/normalize"
import useSWR from "swr"

export const handler = (web3, contract) => (account) => {

    // console.log('web3_3', web3);
    // console.log('contract_3', contract);
    // console.log('account_3', account);

    const swrRes = useSWR(() =>
        (web3 && contract && account?.data) ? `web3/managedCourses/${account}` : null,
        async () => {

            console.log('START  1 ');

            const courses = []
            const courseCount = await contract.methods.getCourseCount().call()

            //console.log('START  2 - courseCount', courseCount);


            for (let i = Number(courseCount) - 1; i >= 0; i--) {
                const courseHash = await contract.methods.getCourseHashAtIndex(i).call()
                const course = await contract.methods.getCourseByHash(courseHash).call()

                //console.log(i, '1. course course', course);
                //console.log(i, '2. course courseHash', courseHash);

                if (course) {
                    //console.log(i, '3. course USAO ');

                    const normalized = normalizeOwnerCourse(web3)({ hash: courseHash }, course)
                    //console.log(i, '4. course NORMALIZESED ', normalized);
                    courses.push(normalized)
                } else {
                    //console.log(i, '5. course NO_COURSE', course);
                }

                //console.log(i, '6. course END');

            }

            console.log('COURSES ALL', courses);

            return courses
        }
    )

    console.log('RESPONSE FINAL', swrRes);


    return swrRes
}