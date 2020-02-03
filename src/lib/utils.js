import { List } from 'immutable';

const noop = () => {};
export const tryCatch = async (fn, { successFn = noop, errorFn = noop } = {}) => {
  try {
    const res = await fn();
    return successFn(res);
  } catch (e) {
    return errorFn(e);
  }
};

export const executeIf = (yes, ifNo) => fn => {
  if (yes) {
    return fn();
  }
  return ifNo();
};

export class ScopedKey {
  constructor(scope) {
    this.scope = scope;
    this.loading = `${scope}Loading`;
    this.response = `${scope}Response`;
    this.error = `${scope}Error`;
    this.loaded = `${scope}Loaded`;
  }
}

const isMergeable = a => a && typeof a === 'object' && typeof a.mergeWith === 'function' && !List.isList(a);

/**
 * Due to bug in Immutable mergeDeepIn implementation, whereby list will be strangely concatenated
 * Need to implement custom logic instead
 * Reference : https://github.com/immutable-js/immutable-js/issues/1452
 */
export const mergeDeep = (a, b) => {
  // If b is null, it would overwrite a, even if a is mergeable
  if (isMergeable(a) && b !== null) {
    return a.mergeWith(mergeDeep, b);
  }

  if (!List.isList(a) || !List.isList(b)) {
    return b;
  }

  return b.reduce((acc, nextItem, index) => {
    const existingItem = acc.get(index);
    if (isMergeable(existingItem)) {
      return acc.set(index, existingItem.mergeWith(mergeDeep, nextItem));
    }
    return acc.set(index, nextItem);
  }, a);
};
