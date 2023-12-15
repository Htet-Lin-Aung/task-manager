import axios, { AxiosRequestConfig } from 'axios';
import { authJsonHeader } from '../headers';

const DOMAIN = import.meta.env.VITE_DOMAIN; // Replace with your API base URL

interface IBlog {
  id: number;
  title: string;
  content: string;
}

interface IBlogContent {
  title: string;
  content: string;
}

export const getBlogs = async (token: string): Promise<{ body: IBlog[] }> => {
  try {
    const response = await axios.get('/blogs', {
      headers: authJsonHeader(token),
      baseURL: DOMAIN,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching blogs: ${error.message}`);
  }
};

export const createBlog = async (blogData: IBlogContent, token: string): Promise<IBlog> => {
  try {
    const response = await axios.post('/blogs', {
      title: blogData.title,
      content: blogData.content,
    }, {
      headers: authJsonHeader(token),
      baseURL: DOMAIN,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating blog: ${error.message}`);
  }
};

export const updateBlog = async (blogId: number, blogData: IBlogContent, token: string): Promise<IBlog> => {
  try {
    const response = await axios.put(`/blogs/${blogId}`, {
      title: blogData.title,
      content: blogData.content,
    }, {
      headers: authJsonHeader(token),
      baseURL: DOMAIN,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error updating blog: ${error.message}`);
  }
};

export const deleteBlog = async (blogId: number, token: string): Promise<void> => {
  try {
    await axios.delete(`/blogs/${blogId}`, {
      headers: authJsonHeader(token),
      baseURL: DOMAIN,
    });
  } catch (error: any) {
    throw new Error(`Error deleting blog: ${error.message}`);
  }
};
