import express from 'express'
import { updateRoleEducator } from '../controllers/educatorController.js';

const educatorRouter = express.Router()

//Ajouter le role de professeur
educatorRouter.get('/update-role', updateRoleEducator)

export default educatorRouter;