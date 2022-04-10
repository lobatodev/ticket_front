import axios from "axios";

export const api_uri = process.env.REACT_APP_API_URI;
const api = axios.create({
	baseURL: api_uri,
	timeout: 60000,
});

export default api;
