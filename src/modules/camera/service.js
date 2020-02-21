import BaseService from 'lib/services/base';

export default class CameraService extends BaseService {
  detect = formData => this.requestUtil.request({ method: 'post', data: formData, path: 'image' });
}
