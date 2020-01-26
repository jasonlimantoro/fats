import axios from 'axios';

const configureAxios = () => {
  const defaultOptions = {
    baseURL: process.env.API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const instance = axios.create(defaultOptions);
  // Set the AUTH token for any request
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('id_token');
    // eslint-disable-next-line
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default configureAxios();
