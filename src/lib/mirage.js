import { Server } from 'miragejs';
import { apiRoutes } from 'config/routes';

export function startMirage({ environment = 'development' } = {}) {
  return new Server({
    environment,
    routes() {
      this.namespace = 'api';
      this.post(apiRoutes.auth.login, {
        id: 12,
        token: 'jwt-token',
      });
    },
  });
}
