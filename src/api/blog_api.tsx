// Axios - an api to connection with sever app
import axios from "axios";
// API URL - commen for all endpoints
const API_URL = "http://localhost:3000/api/v1";
// This function handles add new blog
export const addBlog = async (data: { title: string; content: string }) => {
  try {
    const response = await axios.post(`${API_URL}/blogs`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
// This function handles get all blogs
export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
// This function handles update the blog with a new value
export const updateBlog = async (data: {
  id: number;
  title: string;
  content: string;
}) => {
  try {
    const response = await axios.put(`${API_URL}/blogs/${data.id}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
// This function responsible for delete the blog by using their id
export const deleteBlog = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/blogs/${id}`);
  } catch (err) {
    console.log(err);
  }
};
