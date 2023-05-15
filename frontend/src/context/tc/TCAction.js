import axios from "axios";
import { backendURL } from "../../config";

export const createTC = async (tcObj) => {
  try {
    const { data } = await axios.post(`${backendURL}/api/tc`, tcObj);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const downloadAllTCs = async () => {
  try {
    const { data } = await axios.get(`${backendURL}/api/tc/downloadAllTCs`);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const rangeDownloadTC = async ({ startDate, endDate }) => {
  try {
    const { data } = await axios.get(`${backendURL}/api/tc/rangeDownloadTC?start_date=${startDate}&end_date=${endDate}`);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const getTodaysTC = async () => {
  try {
    const { data } = await axios.get(`${backendURL}/api/tc/getTodaysTC`);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const getTCById = async (id) => {
  try {
    const { data } = await axios.get(`${backendURL}/api/tc/getTCById/${id}`);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const getTCByUser = async (id) => {
  try {
    const { data } = await axios.get(`${backendURL}/api/tc/getTCByUser/${id}`);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const getRecentActivity = async () => {
  try {
    const { data } = await axios.get(`${backendURL}/api/tc/getRecentActivity`);
    return data;
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};