import BaseService from 'lib/services/base';

export default class AttendanceService extends BaseService {
  list = async () =>
    this.requestUtil.request({ method: 'get', path: 'attendances' });
}
