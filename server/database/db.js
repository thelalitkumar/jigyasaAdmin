import mongoose from "mongoose";

const Connection = async(username,password) => {
  const mongoDbURL = `mongodb+srv://${username}:${password}@quizadminportal.tp2xsei.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(mongoDbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('database connected successfully');
  } catch (error) {
    console.log(`failed to connect with db:${error}`);
  }
};

export default Connection;
