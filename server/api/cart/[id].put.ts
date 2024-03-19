import { getServerSession } from "#auth";
import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    await Cart.findByIdAndUpdate(id, body);
    return appConfig.success;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
