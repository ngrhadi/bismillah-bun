import axios from 'axios';

const configurations = {
  BE_API_DOMAIN: process.env.NEXT_PUBLIC_API_URL,
};

export const apiClient = axios.create({
  baseURL: configurations.BE_API_DOMAIN,
});
