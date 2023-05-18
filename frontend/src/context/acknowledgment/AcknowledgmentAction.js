import axios from "axios";
import { backendURL } from "../../config";

export const updateAcknowledgmentMessage = async ({ message, id }) => {
    try {
        const { data } = await axios.post(`${backendURL}/api/donorAcknowledgment/updateMessage`, { message, id });
        return data;
    } catch (error) {
        return { success: false, error: error.response.data.error };
    }
};

export const getAcknowledgmentConfig = async () => {
    try {
        const { data } = await axios.get(`${backendURL}/api/donorAcknowledgment`);
        return data;
    } catch (error) {
        return { success: false, error: error.response.data.error };
    }
};

export const addAcknowledgmentMedia = async (formData) => {
    try {
        const { data } = await axios.post(`${backendURL}/api/donorAcknowledgment/addMedia`, formData);
        return data;
    } catch (error) {
        return { success: false, error: error.response.data.error };
    }
};

export const getSingleMedia = async ({ docId, mediaId }) => {
    try {
        const { data } = await axios.get(`${backendURL}/api/donorAcknowledgment/getSingleMedia/${docId}/${mediaId}`);
        return data;
    } catch (error) {
        return { success: false, error: error.response.data.error };
    }
};

export const deleteSingleMedia = async ({ docId, mediaId }) => {
    try {
        const { data } = await axios.delete(`${backendURL}/api/donorAcknowledgment/getSingleMedia/${docId}/${mediaId}`);
        return data;
    } catch (error) {
        return { success: false, error: error.response.data.error };
    }
};