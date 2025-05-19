import  { clerkClient } from '@clerk/express'

//changer le role en profeseur
export const updateRoleEducator = async () =>{
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetaData:{
                role: 'educator',
            }
        })

        res.json({ success: true, message: 'Vous pouvez publier vos cours'})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}