

import { Button, Message } from "@/components/ui/common";
import { OwnedCourseCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { useUserCoursesHook } from "@/components/hooks/web3/useUserCoursesHook";

export default function OwnedCourses() {

    const { ownedCourses } = useUserCoursesHook();
    console.log('OwnedCourses-sss', ownedCourses);


    return (
        <>
            <div className="py-4">
                <MarketHeader />
            </div>
            <section className="grid grid-cols-1">
                <OwnedCourseCard>
                    <Message>
                        My custom message!
                    </Message>
                    <Button>
                        Watch the course
                    </Button>
                </OwnedCourseCard>
            </section>
        </>
    )
}

OwnedCourses.Layout = BaseLayout