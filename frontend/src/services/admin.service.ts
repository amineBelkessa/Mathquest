import axios from "axios";

const API_URL = "http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/admin";

export const fetchEleves = async () => {
    const response = await axios.get(`${API_URL}/utilisateurs`);
    return response.data;
};
