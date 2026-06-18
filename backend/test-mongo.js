require('dotenv').config();
const mongoose = require('mongoose');

async function testMongo() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully!");
    
    // Check if we can actually read data
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));
    
    console.log("Test completely successful.");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
}

testMongo();
