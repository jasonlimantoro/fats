import BaseService from 'lib/services/base';

export default class ScheduleService extends BaseService {
  list = async () =>
    this.requestUtil.request({
      method: 'get',
      path: 'schedules',
    });

  detail = async id => this.requestUtil.request({ method: 'get', path: `schedules/${id}` });

  create = async body => this.requestUtil.request({ method: 'post', path: 'schedules', data: body });
}
