const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDb");
  });
  return mongoose;
};

module.exports = connectToDb;
