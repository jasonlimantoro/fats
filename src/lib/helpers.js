export const createActionTypes = (actionLists, namespace) =>
  actionLists.reduce(
    (actions, a) => ({
      ...actions,
      [a]: `${namespace}/${a}`,
    }),
    {},
  );
