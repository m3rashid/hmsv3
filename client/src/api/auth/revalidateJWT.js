import { instance } from "api/instance";

export const revalidateJWT = async (setAuth, setSocket) => {
  const token = localStorage.getItem("refresh_token");

  try {
    if (!token) throw Error("No token found");

    const { data } = await instance.post(
      "/auth/revalidate",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    instance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setAuth({
      isLoggedIn: true,
      user: data.user,
      token: data.token,
    });

    return data;
  } catch (err) {}
};
