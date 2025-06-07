import { clerkClient } from '@clerk/express'
import User from '../models/User.js';

// Middleware to protect educator routes
export const protectEducatorClerk = async (req, res, next)=>{
    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if(response.publicMetadata.role !== 'educator'){
            return res.json({ success: false, message: 'Acces refusé'})
        }

        next()

    } catch (error) {
        res.json({ success: false, message: error.message} )
    }
}

