import mongoose from 'mongoose';


//Connection à la base de données mongoDB

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=> console.log('La base de données est connectée'))

    await mongoose.connect(`${process.env.MONGODB_URI}/KnowledgeDB`)
}

export default connectDB