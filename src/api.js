import axios from 'axios';
// https://judgeonline.df.r.appspot.com/api/
// http://localhost:3003/api/
const instance = axios.create({
  baseURL: `http://localhost:3003/api/`,
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
