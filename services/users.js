import axios from "axios";
import api from '@/services/api'
import auth from "./auth";
// const apiURL = "http://192.168.1.74:3000/api"
const apiURL = api;


exports.signup = async ({ firstName, lastName, email, password }) => {
    try {
        // Attempt to send the POST request
        const response = await axios.post(`${apiURL}/users/signup`, { firstName, lastName, email, password });

        const data = response.data;
        const status = response.status
        console.log({ data, status })
        // Return the response data if successful
        return { data, status };
    } catch (error) {
        // Log the error to the console
        console.error("Error during signup:", error.response ? error.response.data : error.message, axios);

        // Optionally, you could throw the error or return a custom error message
        throw new Error("Signup failed, please try again later.");
    }
}
exports.getData = async () => {
    try {
        const token = await auth.get();
        console.log("getData", token);

        if (token) {
            const response = await axios.post(`${apiURL}/users/getData`, {},  // Request body if needed
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token here
                    },
                });
            if (response.status == 200) {
                // console.log(response.data)
                return response.data;
            }
        }
        return null


    } catch (error) {
        console.log("Failed to get data: ")
        console.error("Failed to get token: " + error);
        return null;

    }
}