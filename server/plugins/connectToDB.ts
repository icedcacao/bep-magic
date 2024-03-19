import mongoose from "mongoose";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB!");
  } catch (e) {
    console.error(e);
  }
});
