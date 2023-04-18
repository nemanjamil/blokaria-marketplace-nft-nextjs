import { CourseList } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { WalletBar } from "@/components/ui/web3";
import { getAllCourses } from "@/content/courses/fetcher";
import { useAccountHook } from "@/components/hooks/web3/useAccount";
import { useNetworkHook } from "@/components/hooks/web3/useNetworkHook";

const Marketplace = ({ courses }) => {

    const { account } = useAccountHook();
    const { network } = useNetworkHook();

    return (
        <>
            <div className="py-4">
                <WalletBar
                    address={account.data}
                    network={network.data}
                />
            </div>
            <CourseList
                courses={courses}
            />
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

