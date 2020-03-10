import BaseService from 'lib/services/base';

export default class SemesterService extends BaseService {
  list = async () => this.requestUtil.request({ method: 'get', path: 'semesters' });
}
