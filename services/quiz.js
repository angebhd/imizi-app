import axios from "axios";
import api from '@/services/api'
import auth from "./auth";
const apiURL = api;


exports.submitDaily = async ({quizId, answers}) => {
    try {
        const token = await auth.get();
        console.log(token);
        if (token) {
            const response = await axios.post(`${apiURL}/quiz/daily/submit`, {quizId, answers}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token here
                    },

                });
                console.log(response.status);
            if (response.status == 201) {
                // return response.data;
            }
        }
        return null
    } catch (error) {
        console.log("Failed to get data: ")
        console.error(error);
        return null;

    }
}

exports.submitSunday = async ({quizId, answers}) => {
    try {
        const token = await auth.get();
        console.log(token);
        if (token) {
            const response = await axios.post(`${apiURL}/quiz/sunday/submit`, {quizId, answers}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token here
                    },

                });
                console.log(response.status);
            if (response.status == 201) {
                // return response.data;
            }
        }
        return null
    } catch (error) {
        console.log("Failed to get data: ")
        console.error(error);
        return null;

    }
}

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
exports.getQuizSunday = async (quizId) => {
    try {
        const token = await auth.get();
        console.log(token);
        if (token) {
            const response = await axios.get(`${apiURL}/quiz/sunday`,  // Request body if needed
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