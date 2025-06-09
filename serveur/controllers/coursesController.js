import Course from '../models/Course.js';

//Get all courses
export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({isPublished: true}).select(
            ['-courseContent', '-enrolledStudents']).populate({path: 'educator'})

            res.json({ success: true, courses})
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

//Get courses by Id
export const getCourseId = async (req, res) => {
    const {id} = req.params

    try {
        const courseData = await Course.findById(id).populate({path: 'educator'})

        //delete lectureUrl if siPreviewFree is false
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

