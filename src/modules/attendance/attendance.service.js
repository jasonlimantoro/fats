import BaseService from 'lib/services/base';

export default class AttendanceService extends BaseService {
  list = async ({ queryParams } = {}) =>
    this.requestUtil.request({ method: 'get', path: 'attendances', queryParams });

  destroy = async id => this.requestUtil.request({ method: 'delete', path: `attendances/${id}` });

  create = async body => this.requestUtil.request({ method: 'post', path: `attendances`, data: body });
}
