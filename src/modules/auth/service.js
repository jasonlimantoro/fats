import BaseService from 'lib/services/base';

export default class AuthService extends BaseService {
  login = async body => {
    return this.requestUtil.request({
      method: 'post',
      path: 'token',
      data: body,
    });
  };

  logout = async () => {};
}
