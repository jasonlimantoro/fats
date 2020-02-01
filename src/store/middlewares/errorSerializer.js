import { serializeError } from 'serialize-error';

const errorSerializer = () => next => action => {
  const transformedAction = action;
  if (transformedAction.type.indexOf('ERROR') !== -1 || transformedAction.type.indexOf('FAILURE') !== -1) {
    transformedAction.payload = serializeError(transformedAction.payload);
  }
  return next(transformedAction);
};

export default errorSerializer;
