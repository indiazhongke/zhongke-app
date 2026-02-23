import axios from "axios";

const API = axios.create({
  baseURL: "https://zhongke-app-zgf2.onrender.com/api",
});

export default API;
