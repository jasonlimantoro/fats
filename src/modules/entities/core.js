import { ScopedKey } from 'lib/utils';

const scopes = ['fetch', 'detail', 'update', 'create', 'delete'];
const resources = ['attendance', 'schedule', 'student', 'lab', 'course', 'semester', 'timetable'];

const pluralize = s => s + 's';

const initialData = resources.reduce(
  (accum, current) => ({
    ...accum,
    [pluralize(current)]: {},
  }),
  {},
);
const initialStatus = resources.reduce(
  (allResources, currentResource) => ({
    ...allResources,
    [currentResource]: scopes.reduce((allScopes, currentScopes) => {
      const keyedScope = new ScopedKey(currentScopes);
      return {
        ...allScopes,
        [keyedScope.error]: false,
        [keyedScope.loading]: false,
        [keyedScope.loaded]: false,
      };
    }, {}),
  }),
  {},
);

export const state = {
  data: initialData,
  status: initialStatus,
};
