import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const testDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/KnowledgeDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connexion MongoDB réussie !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur de connexion :", error.message);
    process.exit(1);
  }
};

testDB();
