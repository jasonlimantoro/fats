import BaseService from 'lib/services/base';

export default class LabService extends BaseService {
  list = () => this.requestUtil.request({ method: 'get', path: 'labs' });
}
