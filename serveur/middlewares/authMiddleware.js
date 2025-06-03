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

export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);

    if (!user || !user.isEducator) {
      return res.status(403).json({ success: false, message: "Accès refusé : enseignant requis" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};