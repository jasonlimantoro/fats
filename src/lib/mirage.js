import { Factory, Model, Server } from 'miragejs';
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
      this.post('/token', {
        access: 'jwt-token',
      });
      this.get('/attendances', schema => {
        return schema.attendances.all().models;
      });
      this.get('/attendances/:id', (schema, request) => {
        const { id } = request.params;
        return schema.attendances.find(id).attrs;
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
