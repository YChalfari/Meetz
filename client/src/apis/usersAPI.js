import axios from "axios";

let baseURL = process.env.REACT_APP_EXPRESS_URL || "/api";
let headers = {};
if (localStorage.token) {
  headers.Authorization = `Bearer ${localStorage.token}`;
}
console.log(process.env.REACT_APP_EXPRESS_URL);
export default axios.create({
  // baseURL: "http://localhost:3001/api",
  baseURL,
  headers,
});
