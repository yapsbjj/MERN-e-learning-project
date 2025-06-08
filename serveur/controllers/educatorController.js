import  { clerkClient } from '@clerk/express'
import Course from '../models/Course.js'
import { v2 as cloudinary } from 'cloudinary'
import User from '../models/User.js'
import Purchase from '../models/Purchase.js';


 
//update role to educator via Clerk
export const updateRoleEducator = async (req, res) =>{
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetaData:{
                "role": "educator",
            }
        })

        res.json({ success: true, message: 'Vous pouvez publier vos cours en tant que professeur'})

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Add new course

export const addCourse = async (req, res)=>{
    try {
       const { courseData } = req.body
       const imageFile = req.file
       const educatorId = req.auth.userId
       
       if(!imageFile){
        return res.json({ success: false, message: 'aucune image trouvé' })
       }

       const parsedCourseData = await JSON.parse(courseData)

       console.log("Cours reçu :", parsedCourseData);
       parsedCourseData.educator = educatorId
       const newCourse = await Course.create(parsedCourseData)
       const imageUpload = await cloudinary.uploader.upload(imageFile.path)
       newCourse.courseThumbnail = imageUpload.secure_url
       await newCourse.save()

       res.json({ success: true, message: 'Cours ajouté avec succes' })

    } catch (error) {
        res.json({ success: false, message: error.message} )
    }
}

//Voir les cours des professeurs (GET)
export const getEducatorCourses = async (req, res)=>{
    try {
        const educator = req.auth.userId

        const courses = await Course.find({educator})
        res.json({ success: true, courses})
    } catch (error) {
        res.json({success: false, message: error.message })
    }
}

//Voir toutes les données des professeurs dans le dashboard ( le compte actuel, le nombre d'étudiants, le nombres de cours)
export const educatorDashboardData = async (req, res)=>{
    try {
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id)

        // Calculer le montant total gagné des cours vendu
        const purchases = await Purchase.find({
            courseId: {$in: courseIds},
            status: 'completed'
        });

        const totalEarnings = purchases.reduce((sum, Purchase)=> sum + purchases.amount, 0);
        
        //Récuperer les id d'etudiants deja inscrit via le titre des cours
        const enrolledStudentsData = [];
        for(const course of courses){
            const students = await User.find({
                _id: {$in: course.enrolledStudents}
            }, 'name imageUrl');

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                });
            });
        }

        res.json({success: true, dashboardData: {
            totalEarnings, enrolledStudentsData, totalCourses
        }})
    } catch (error) {
        res.json({ success: false, message: error.message });
    }    
}

//Recupérer les data des étudiants avec leur achats
export const getEnrolledStudentsData = async (req, res)=>{
    try {
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const courseIds = courses.map(course => course._id);
        
        const purchases = await Purchase.find({
            courseId: {$in: courseIds },
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }));

        res.json({success: true, enrolledStudents})
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}