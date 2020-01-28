import RequestUtilService from './request-util';

export default class MockUtilService extends RequestUtilService {
  request = async ({ path, method } = {}) => {
    switch (true) {
      case /login/.test(path): {
        if (method === 'post') {
          return {
            id: 12,
            token: 'some-token',
          };
        }
        throw Error('Invalid Credentials');
      }

      default:
        throw Error('Route not found');
    }
  };
}
