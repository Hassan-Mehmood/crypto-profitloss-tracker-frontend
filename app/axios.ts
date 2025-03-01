import axios from "axios";
import { getUserCookie } from "./actions/cookiesActions";

export const coinGecko = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

export const serverApi = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});
