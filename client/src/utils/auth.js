import axios from "axios";

export async function isLoggedIn() {
  try {
    const response = await axios.get("/api/auth");
    return response.status == 200 ? true : false;
  } catch (error) {
    return false;
  }
}
