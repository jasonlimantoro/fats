import BaseService from 'lib/services/base';

export default class CourseService extends BaseService {
  list = async () => this.requestUtil.request({ method: 'get', path: 'courses' });
}
