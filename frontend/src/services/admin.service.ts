import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";
export const fetchEleves = async () => {
    const response = await axios.get(`${API_URL}/utilisateurs`);
    return response.data;
};

export const deleteEleve = async (id: string) => {
    return axios.delete(`${API_URL}/eleves/${id}`);
};