import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token || typeof token !== "string") {
    console.error("Token is not a string:", token);
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const dateNow = new Date();

    return decodedToken.exp < dateNow.getTime() / 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}
