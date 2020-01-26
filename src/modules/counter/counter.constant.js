import { createActionTypes } from 'lib/helpers';

/**
 * @type Object
 * @prop INCREMENT
 * @prop DECREMENT
 */
export const actionTypes = createActionTypes(
  ['INCREMENT', 'DECREMENT'],
  'COUNTER',
);
