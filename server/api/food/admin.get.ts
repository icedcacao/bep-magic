import { getServerSession } from "#auth";
import Food from "~/server/models/food.schema";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const result = Food.find({});
    return result;
  } catch (error) {
    throw createError(appConfig.error.internalservererror);
  }
});
