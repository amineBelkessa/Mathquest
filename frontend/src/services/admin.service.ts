import axios from "axios";
// http://localhost:8080/api/admin   local
//http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/admin   sur le serveur
const API_URL = "http://srv-dpi-proj-mathquest-testS.univ-rouen.fr/api/admin";

export const fetchEleves = async () => {
    const response = await axios.get(`${API_URL}/utilisateurs`);
    return response.data;
};

export const deleteEleve = async (id: string) => {
    return axios.delete(`${API_URL}/eleves/${id}`);
};