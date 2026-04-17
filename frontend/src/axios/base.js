import axios from "axios";

const instance = axios.create({
      baseURL: "http://localhost:5000/v1/music/",
      headers: {
            accept: "application/json",
      },
});

export default instance;
