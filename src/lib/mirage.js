import { Factory, Model, Server } from 'miragejs';
import { apiRoutes } from 'config/routes';
import faker from 'faker';
import moment from 'moment';

export function startMirage({ environment = 'development' } = {}) {
  return new Server({
    models: {
      attendance: Model,
    },
    environment,
    routes() {
      this.namespace = 'api';
      this.post(apiRoutes.auth.login, {
        id: 12,
        token: 'jwt-token',
      });
      this.get('/attendances', schema => {
        return schema.attendances.all().models;
      });
    },
    factories: {
      attendance: Factory.extend({
        course() {
          return `CZ300${faker.random.number({ min: 1, max: 9 })}`;
        },
        index() {
          return faker.random.number({ min: 10000, max: 10200 });
        },
        group() {
          return `SSP${faker.random.number({ min: 1, max: 10 })}`;
        },
        time() {
          return moment(faker.date.recent()).format('YYYY-MM-DD HH:mm');
        },
      }),
    },
    seeds(server) {
      server.createList('attendance', 20);
    },
  });
}
