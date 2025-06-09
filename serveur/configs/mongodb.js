import mongoose from 'mongoose';


//Mongo db connect

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=> console.log('La base de données est connectée'))

    await mongoose.connect(`${process.env.MONGODB_URI}/KnowledgeDB`)
}

export default connectDB