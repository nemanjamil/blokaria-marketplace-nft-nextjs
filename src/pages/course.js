import { Modal } from "@/components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";

export default function Course() {

    return (
        <>
            <div className="py-4">
                <CourseHero />
            </div>
            <Keypoints />
            <Curriculum />
            <Modal />
        </>
    )
}

Course.Layout = BaseLayout