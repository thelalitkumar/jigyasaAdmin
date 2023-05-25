import axios from "axios";

export const addNewQues = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const authToken = `Bearer ${token}`;
    const response = await axios.post(`/add`, data, {
      headers: {
        Authorization: authToken,
      },
    });
    // console.log(response);
  } catch (error) {
    console.log(`Error while calling addNewQuesApi: ${error}`);
    throw error;
  }
};

export const getQues = async () => {
  try {
    const token = localStorage.getItem("token");
    const authToken = `Bearer ${token}`;
    const response = await axios.get(`/all`, {
      headers: {
        Authorization: authToken,
      },
    });
    // console.log(response);
    return response.data; //return to question.js
  } catch (error) {
    console.log(`Error while calling getQuesApi: ${error}`);
    throw error;
  }
};

export const getQuesById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const authToken = `Bearer ${token}`;
    const response = await axios.get(`/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.log(`Error while calling getQuesByIdApi: ${error}`);
    throw error;
  }
};

export const editQues = async (data, id) => {
  try {
    const token = localStorage.getItem("token");
    const authToken = `Bearer ${token}`;
    const response = await axios.put(`/${id}`, data, {
      headers: {
        Authorization: authToken,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(`Error while calling editQuesApi: ${error}`);
    throw error;
  }
};

export const deleteQues = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const authToken = `Bearer ${token}`;
    return axios.delete(`/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
  } catch (error) {
    console.log(`error while calling deleteQuesApi : ${error} `);
  }
};
