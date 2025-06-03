import Course from '../models/Course.js';

//Afficher tous les cours (GET)
export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({isPublished: true}).select(
            ['-courseContent', '-enrolledStudents']).populate({path: 'educator'})

            res.json({ success: true, courses})
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

//Afficher les cours par Id
export const getCourseId = async (req, res) => {
    const {id} = req.params

    try {
        const courseData = await Course.findById(id).populate({path: 'educator'})

        //supprimer lectureUrl si siPreviewFree est false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lecturUrl = "";
                }
            })
        })

        res.json({ success: true, courseData})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }   
}

