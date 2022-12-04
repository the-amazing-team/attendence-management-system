import axios from "axios";
const instance = axios.create({
  baseURL: "https://hostel-management-backend-standalone.vercel.app",
});
export default instance;
