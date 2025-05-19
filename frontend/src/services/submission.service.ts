// src/services/submission.service.ts
import axios from "axios";

const API_URL = "http://localhost:8080/api/submissions";

export const getSubmissionsByUser = async (username: string) => {
    const response = await axios.get(`${API_URL}/user/${username}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
