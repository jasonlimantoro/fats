const noop = () => {};
export const tryCatch = async (
  fn,
  { successFn = noop, errorFn = noop } = {},
) => {
  try {
    const res = await fn();
    return successFn(res);
  } catch (e) {
    return errorFn(e);
  }
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
