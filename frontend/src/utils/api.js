import axios from "axios";

// Define base URL
const API_BASE_URL = "http://localhost:5000/api";

// Create a reusable Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to make API requests
export const apiRequest = async (method, url, data = null, headers = {}) => {
    try {
        const response = await apiClient({
            method,
            url,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong!";
    }
};
