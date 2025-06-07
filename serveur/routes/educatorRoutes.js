import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducatorClerk } from '../middlewares/authMiddleware.js';
import { requireAuth } from '@clerk/express';

const educatorRouter = express.Router()

//Add Educator Role
 
educatorRouter.get('/update-role', requireAuth, updateRoleEducator)

educatorRouter.post('/add-course', upload.single('image'), protectEducatorClerk, addCourse)
educatorRouter.get('/courses', protectEducatorClerk, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducatorClerk, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducatorClerk, getEnrolledStudentsData)


export default educatorRouter;