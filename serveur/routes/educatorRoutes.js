import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator, protectEducatorClerk } from '../middlewares/authMiddleware.js';
import { requireAuth } from '@clerk/express';

const educatorRouter = express.Router()

//Add Educator Role
 //educatorRouter.post('/become', requireAuth, becomeEducator);
educatorRouter.get('/update-role', requireAuth, updateRoleEducator)

educatorRouter.post('/add-course', upload.single('image'), protectEducator, protectEducatorClerk, addCourse)
educatorRouter.get('/courses', protectEducator, protectEducatorClerk, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, protectEducatorClerk, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducator, protectEducatorClerk, getEnrolledStudentsData)


export default educatorRouter;