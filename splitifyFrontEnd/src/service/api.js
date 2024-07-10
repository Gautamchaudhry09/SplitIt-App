import axios from "axios";
import { json } from "react-router-dom";

const url = "https://splitit-app.onrender.com";
export const registerUser = async (data) => {
  try {
    await axios.post(`${url}/addUser`, data);
    window.alert("Registered Successfully, Please Login Now");
    return true;
  } catch (error) {
    const message = error.response.data.message;
    window.alert(message);
    console.error("Error while registering User", error);
    return false;
  }
};

export const loginUser = async (data) => {
  try {
    await axios.post(`${url}/findUser`, data);

    window.alert("Login successful, Enjoy Splitting your Bill");
    return true;
  } catch (error) {
    const message = error?.response?.data?.message;
    // console.log(error);
    window.alert(message);

    console.error("Login failed:", error?.response);
    return false;
  }
};

export const saveOccasion = async (data) => {
  try {
    await axios.post(`${url}/saveOccasion`, data);
    window.alert("Occasion Split Saved Successfully!");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOccasions = async (data) => {
  try {
    const res = await axios.post(`${url}/findOccasions`, data);
    return res.data.occasions;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOccasion = async (data) => {
  try {
    const res = await axios.put(`${url}/deleteOccasion`, data);
    // const res = await axios.delete(`${url}/deleteOccasion`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};
