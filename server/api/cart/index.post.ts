import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    await new Cart(body).save();
    indexEmitter.cartEmitter.emit(indexEmitter.cartEmitterName);
    return appConfig.success;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
