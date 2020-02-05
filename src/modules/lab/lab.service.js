import BaseService from 'lib/services/base';

export default class LabService extends BaseService {
  list = ({ queryParams } = {}) => this.requestUtil.request({ method: 'get', path: 'labs', queryParams });

  update = (id, body) => this.requestUtil.request({ method: 'patch', path: `labs/${id}`, data: body });
}
