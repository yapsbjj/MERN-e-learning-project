import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//initialiser express
const app = express()

// Middlewares
app.use(cors())

//Routes
app.get('/', (req, res) => res.send("API working"))

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`le serveur est disponible sur le port ${PORT}`)
})