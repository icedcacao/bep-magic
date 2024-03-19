import { getServerSession } from "#auth";
import Cart from "~/server/models/cart.schema";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const result = Cart.find({ is_resolved: true }).sort({ updated_at: -1 });
    return result;
  } catch (error) {
    throw createError(appConfig.error.internalservererror);
  }
});
