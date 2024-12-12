import axios from "axios";
import api from '@/services/api'
import auth from "./auth";
// const apiURL = "http://192.168.1.74:3000/api"
const apiURL = api;


exports.create = async (familyName) => {
    try {
        const token = await auth.get();
        const response = await axios.post(`${apiURL}/family/create`, { familyName }, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach the token here
            },
        });
        const data = response.data;
        const status = response.status
        return { data, status };
    } catch (error) {
        // Log the error to the console
        console.error("Error during creation:", error.response ? error.response.data : error.message, axios);
    }
}

exports.invite = async (email) => {
    try {
        const token = await auth.get();
        // Attempt to send the POST request
        const response = await axios.post(`${apiURL}/family/invite`, { email }, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach the token here
            },
        });
        const data = response.data;
        const status = response.status
        // Return the response data if successful
        return { data, status };
    } catch (error) {
        // Log the error to the console
        console.error("Error during invite:", error.response ? error.response.data : error.message, axios);
    }
}

exports.join = async () => {
    try {
        const token = await auth.get();
        // Attempt to send the POST request
        const response = await axios.post(`${apiURL}/family/join`, {}, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach the token here
            },
        });
        const status = response.status
        // Return the response data if successful
        return status;
    } catch (error) {
        // Log the error to the console
        console.error("Error during join:", error.response ? error.response.data : error.message, axios);
    }
}
// exports.getData = async () => {
//     try {
//         const token = await auth.get();
//         console.log("getData", token);

//         if (token) {
//             const response = await axios.post(`${apiURL}/users/getData`, {},  // Request body if needed
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Attach the token here
//                     },
//                 });
//             if (response.status == 200) {
//                 // console.log(response.data)
//                 return response.data;
//             }
//         }
//         return null


//     } catch (error) {
//         console.log("Failed to get data: ")
//         console.error("Failed to get token: " + error);
//         return null;

//     }
// }