import axios from "axios";
import api from '@/services/api'
import auth from "./auth";
const apiURL = api;


// exports.signup = async ({ firstName, lastName, email, password }) => {
//     try {
//         // Attempt to send the POST request
//         const response = await axios.post(`${apiURL}/users/signup`, { firstName, lastName, email, password });

//         const data = response.data;
//         const status = response.status
//         // console.log({ data, status })
//         // Return the response data if successful
//         return { data, status };
//     } catch (error) {
//         // Log the error to the console
//         console.error("Error during signup:", error.response ? error.response.data : error.message, axios);

//         // Optionally, you could throw the error or return a custom error message
//         throw new Error("Signup failed, please try again later.");
//     }
// }
// exports.signin = async ({email, password }) => {
//     try {
//         // Attempt to send the POST request
//         const response = await axios.post(`${apiURL}/users/login`, { email, password });

//         const data = response.data;
//         const status = response.status
//         console.log({ data, status })
//         // Return the response data if successful
//         return { data, status };
//     } catch (error) {
//         // Log the error to the console
//         console.error("Error during signup:", error.response ? error.response.data : error.message, axios);

//         // Optionally, you could throw the error or return a custom error message
//         throw new Error("Signup failed, please try again later.");
//     }
// }
exports.getQuiz = async (quizId) => {
    try {
        const token = await auth.get();
        console.log(token);
        if (token) {
            const response = await axios.get(`${apiURL}/quiz/daily`,  // Request body if needed
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token here
                    },
                    params: {
                        quizId, // Pass quizId here, which will be appended as ?quizId=value
                    },
                });
                console.log(response)
            if (response.status == 201) {
                return response.data;
            }
        }
        return null
    } catch (error) {
        console.log("Failed to get data: ")
        console.error(error);
        return null;

    }
}
exports.getDailyAll = async () => {
    try {
        const token = await auth.get();
        console.log(token);
        if (token) {
            const response = await axios.get(`${apiURL}/quiz/daily`,  // Request body if needed
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token here
                    },
                });
            if (response.status == 201) {
                return response.data;
            }
        }
        return null
    } catch (error) {
        console.log("Failed to get data: ")
        console.error(error);
        return null;

    }
}
exports.getScores = async () => {
    try {
        const token = await auth.get();

        if (token) {
            const response = await axios.post(`${apiURL}/users/getData`, {},  // Request body if needed
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token here
                    },
                });
            console.log(response.data)
            if (response.status == 200) {

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