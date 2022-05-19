import { authDefaultState } from "../../atoms/auth";
import { instance } from "../instance";

export const revalidateJWT = async (setAuth) => {
  const token = localStorage.getItem("refresh_token");

  if (!token) return;
  const { data } = await instance.post(
    "/auth/revalidate",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);
  setAuth({
    isLoggedIn: true,
    user: data.user,
    token: data.token,
  });
};
