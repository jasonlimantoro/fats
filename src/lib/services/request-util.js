import axios from 'axios';

export default class RequestUtilService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    this._axios = axios.create({ baseURL: baseUrl });
  }

  getConfig = config => config;

  request = ({ method = 'get', path, data, config = {} } = {}) => {
    const finalConfig = this.getConfig(config);
    switch (method) {
      case 'get':
        return axios.get(path, finalConfig);
      case 'post':
        return axios.post(path, data, finalConfig);
      case 'delete':
        return axios.delete(path, finalConfig);
      case 'patch':
        return axios.patch(path, data, finalConfig);
      default:
        throw Error(`Method ${method} is not one of get|post|delete|patch `);
    }
  };
}
