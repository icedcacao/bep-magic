import Food from "~/server/models/food.schema";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const result = Food.find({ is_displayed: true });
    return result;
  } catch (error) {
    throw createError(appConfig.error.internalservererror);
  }
});
