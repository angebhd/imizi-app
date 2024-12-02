import axios from "axios";
import api from '@/services/api'
// const apiURL = "http://192.168.1.74:3000/api"
const apiURL = api;


exports.signup = async ({ firstName, lastName, email, password }) => {
    try {
        // Attempt to send the POST request
        const response = await axios.post(`${apiURL}/users/signup`, { firstName, lastName, email, password });
        
        const data = response.data;
        const status = response.status
        console.log({data, status})
        // Return the response data if successful
        return {data, status};
    } catch (error) {
        // Log the error to the console
        console.error("Error during signup:", error.response ? error.response.data : error.message, axios);

        // Optionally, you could throw the error or return a custom error message
        throw new Error("Signup failed, please try again later.");
    }
}