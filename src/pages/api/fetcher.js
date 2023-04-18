import courses from "@/content/courses";

const getAllCoursesApi = (req, res) => {

    try {
        let data = {
            data: courses,
            courseMap: courses.reduce((a, c, i) => {
                a[c.id] = c
                a[c.id].index = i
                return a
            }, {})
        }

        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}

export default getAllCoursesApi;