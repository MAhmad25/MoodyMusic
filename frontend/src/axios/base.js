import axios from "axios";

const instance = axios.create({
      baseURL: String(import.meta.env.VITE_BACKEND_URL),
      headers: {
            accept: "application/json",
      },
});

export default instance;
