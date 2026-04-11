import axios from "axios";
import supabase from "./supabase.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

axios.interceptors.request.use(async (config) => {
  const requestUrl = config.url || "";

  if (BACKEND_URL && requestUrl.startsWith(BACKEND_URL)) {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

export { BACKEND_URL };
