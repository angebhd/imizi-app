import axios from "axios";
import api from '@/services/api'
import auth from "./auth";
// const apiURL = "http://192.168.1.74:3000/api"
const apiURL = api;

exports.register = async (token:string) => {
    try {
        const tokenLocal = await auth.get();

        if (token) {
            const response = await axios.post(`${apiURL}/notifications/register`, {token},  // Request body if needed
                {
                    headers: {
                        Authorization: `Bearer ${tokenLocal}`, // Attach the token here
                    },
                });
            if (response.status == 200 || response.status == 201) {
               
                return true;
            }
        }
        return false


    } catch (error) {
        console.log("Failed to get data: ")
        console.error("Failed to get token: " + error);
        return false;

    }
}