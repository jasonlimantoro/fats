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
