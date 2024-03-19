import { getServerSession } from "#auth";
import Food from "~/server/models/food.schema";
import mongoose from "mongoose";
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const body = await readBody(event);
    if (body.image_url != undefined) {
      const res: any = await $fetch("http://localhost:3001/upload", {
        headers: {
          "x-api-key": runtimeConfig.imageXApiKey,
        },
        method: "POST",
        body: {
          image: body.image_url,
        },
      });
      body.image_url = res.imageUrl;
    }
    await new Food(body).save();
    return appConfig.success;
  } catch (error: any) {
    if (
      error.statusCode == 400 ||
      error instanceof mongoose.Error.ValidationError
    ) {
      throw createError(appConfig.error.badrequest);
    } else if (error.statusCode == 401) {
      throw createError(appConfig.error.unauthorized);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
