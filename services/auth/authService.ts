import HttpRequest from "../api/HttpRequest";

export const checkAuthentication = async (): Promise<boolean> => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  const http = new HttpRequest();

  try {
    const res = await http.get<{ status: string }>("/api/v1/me/check", {
      headers: { authorization: token },
    });

    if (res.data.status === "success") {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
