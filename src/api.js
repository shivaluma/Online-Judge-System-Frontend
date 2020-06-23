import axios from 'axios';

const instance = axios.create({
  baseURL: `https://judgeonline.df.r.appspot.com/api/`,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('brosjudge-token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
