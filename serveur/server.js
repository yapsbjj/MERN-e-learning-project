import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'

//initialiser express
const app = express()

//Connection à la base de données
await connectDB()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

//Routes
app.get('/', (req, res) => res.send("API working"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`le serveur est disponible sur le port ${PORT}`)
})