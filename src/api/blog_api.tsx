import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const addBlog = async (data:{title:string,content:string}) => {
  const response = await axios.post(`${API_URL}/blogs`,data);
  return response.data;
};
export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const deleteBlog = async (id: number) => {
  await axios.delete(`${API_URL}/blogs/${id}`);
};