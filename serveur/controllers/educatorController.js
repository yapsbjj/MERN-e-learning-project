import  { clerkClient } from '@clerk/express'

//changer le role en profeseur
export const updateRoleEducator = async (req, res) =>{
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

// Ajouter un nouveau cours

export const addCourse = async (req, res)=>{
    try {
       const { courseData } = req.body
       const imageFile = req.imageFile
       const userId = req.auth.userId
       
       if(!imageFile){
        return res.json({ success: false, message: 'aucune image trouvé' })
       }
    } catch (error) {
        
    }
}