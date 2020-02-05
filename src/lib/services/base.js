import RequestUtilService from './request-util';

export default class BaseService {
  constructor({ baseUrl, requestUtilConfig, RequestUtil = RequestUtilService } = {}) {
    this.baseUrl = baseUrl;
    this.requestUtil = new RequestUtil({ baseUrl, ...requestUtilConfig });
  }

  replaceRequestUtil = ({ baseUrl, RequestUtil, requestUtilConfig }) => {
    this.requestUtil = new RequestUtil({ baseUrl, ...requestUtilConfig });
  };
}
