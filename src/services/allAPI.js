import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

export const loginAPI = (reqBody) => {
  return commonAPI("POST", `${SERVER_URL}/api/auth/login`, reqBody);
};
export const registerAPI = (reqBody) => {
  return commonAPI("POST", `${SERVER_URL}/api/auth/register`, reqBody);
};
