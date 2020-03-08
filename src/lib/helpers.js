import cls from 'classnames';

export const createActionTypes = (actionLists, namespace) =>
  actionLists.reduce(
    (actions, a) => ({
      ...actions,
      [a]: `${namespace}/${a}`,
    }),
    {},
  );

const defaultTypes = {
  success: {
    main: 'bg-green-200',
    text: 'text-green-700',
    border: 'border-green-400',
  },
  error: {
    main: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-400',
  },
  info: {
    main: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-400',
  },
};

export const getTypeStyle = (type, types = defaultTypes, properties = ['text', 'border', 'main']) => {
  const typeStyle = types[type];
  return properties.reduce((accum, current) => cls(accum, typeStyle[current]), '');
};
