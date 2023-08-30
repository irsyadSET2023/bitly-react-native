import axios from "axios";

export const registerUser = async (data) => {
  return await axios.post(
    "https://bitly-clone-v2.onrender.com/api/register",
    data
  );
};

export const loginUser = async (data) => {
  return await axios.post(
    "https://bitly-clone-v2.onrender.com/api/login",
    data
  );
};

export const getAllLinks = async (token) => {
  return await axios.get("https://bitly-clone-v2.onrender.com/api/link", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addLink = (token, data) => {
  return axios.post("https://bitly-clone-v2.onrender.com/api/link", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editLink = (token, data) => {
  return axios.put(`https://bitly-clone-v2.onrender.com/api/link`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteLink = (token, data) => {
  return axios.delete(`https://bitly-clone-v2.onrender.com/api/link`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const redirectLink = (slug) => {
  return axios.get(`https://bitly-clone-v2.onrender.com/${slug}`);
};
