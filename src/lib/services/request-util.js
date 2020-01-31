import axios from 'axios';

export default class RequestUtilService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    this._axios = axios.create();
  }

  getConfig = config => config;

  request = ({ method = 'get', path, data, config = {} } = {}) => {
    const finalConfig = this.getConfig(config);
    const finalPath = `${this.baseUrl}/${path}/`;
    switch (method) {
      case 'get':
        return axios.get(finalPath, finalConfig);
      case 'post':
        return axios.post(finalPath, data, finalConfig);
      case 'delete':
        return axios.delete(finalPath, finalConfig);
      case 'patch':
        return axios.patch(finalPath, data, finalConfig);
      default:
        throw Error(`Method ${method} is not one of get|post|delete|patch `);
    }
  };
}
