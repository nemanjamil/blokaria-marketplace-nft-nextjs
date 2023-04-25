import { useState } from "react"
import { CourseList, CourseCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { getAllCourses } from "@/content/courses/fetcher";
import { useAccountHook } from "@/components/hooks/web3/useAccount";
import { Button } from "@/components/ui/common"
import { OrderModal } from "@/components/ui/order"
import { useWeb3 } from "@/components/providers"
import { useUserCoursesHook } from "@/components/hooks/web3/useUserCoursesHook";

const Marketplace = ({ courses }) => {
    const { web3, contract } = useWeb3()

    const [selectedCourse, setSelectedCourse] = useState(null)
    const { account } = useAccountHook();
    let ownedCourses = useUserCoursesHook(courses, account);

    console.log('ownedCourses', ownedCourses);

    const purchaseCourse = async order => {
        const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)
        const orderHash = web3.utils.soliditySha3(
            { type: "bytes16", value: hexCourseId },
            { type: "address", value: account.data }
        )
        const emailHash = web3.utils.sha3(order.email)
        const proof = web3.utils.soliditySha3(
            { type: "bytes32", value: emailHash },
            { type: "bytes32", value: orderHash }
        )

        const value = web3.utils.toWei(String(order.price))

        try {
            const result = await contract.methods.purchaseCourse(
                hexCourseId,
                proof
            ).send({ from: account.data, value })
            console.log("result from Transaction", result)
        } catch {
            console.error("Purchase course: Operation has failed.")
        }
    }

    return (
        <>
            <div className="py-4">
                <MarketHeader />
            </div>
            <CourseList
                courses={courses}
            >
                {course =>
                    <CourseCard
                        key={course.id}
                        course={course}
                        Footer={() =>
                            <div className="mt-4">
                                <Button
                                    onClick={() => setSelectedCourse(course)}
                                    variant="lightPurple">
                                    Purchase
                                </Button>
                            </div>
                        }
                    />
                }
            </CourseList>
            {selectedCourse &&
                <OrderModal
                    course={selectedCourse}
                    onSubmit={purchaseCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            }
        </>
    )
}

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

Marketplace.Layout = BaseLayout
export default Marketplace;

