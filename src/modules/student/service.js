import BaseService from 'lib/services/base';

export default class StudentService extends BaseService {
  list = async () => this.requestUtil.request({ method: 'get', path: 'students' });
}
