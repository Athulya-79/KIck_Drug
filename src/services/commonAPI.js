import axios from 'axios';

const commonAPI = async (method, url, data = null) => {
  try {
    const token = sessionStorage.getItem('token'); // Get token from sessionStorage

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`; // Attach token if available
    }

    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('API request error:', error.response?.data || error.message);
    throw error;
  }
};

export default commonAPI;
