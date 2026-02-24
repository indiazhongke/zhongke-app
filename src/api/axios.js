import axios from "axios";

// Use environment variable for production, fallback to localhost for development
const baseURL = import.meta.env.VITE_API_URL || "https://zhongke-app-zgf2.onrender.com/api";

const API = axios.create({
  baseURL,
});

// Response interceptor to transform MongoDB _id to id
API.interceptors.response.use(
  (response) => {
    // Transform single object
    if (response.data && typeof response.data === 'object' && response.data._id) {
      response.data.id = response.data._id;
    }
    
    // Transform array of objects
    if (Array.isArray(response.data)) {
      response.data = response.data.map(item => {
        if (item && item._id) {
          return { ...item, id: item._id };
        }
        return item;
      });
    }
    
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
