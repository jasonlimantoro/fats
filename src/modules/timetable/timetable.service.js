import BaseService from 'lib/services/base';

export default class TimetableService extends BaseService {
  list = () => this.requestUtil.request({ method: 'get', path: 'timetables' });
}
