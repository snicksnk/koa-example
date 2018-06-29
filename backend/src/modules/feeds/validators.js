export function feed(params) {
  let err = {};
  if (!params.title) {
    err.title = ['Title should be not empty'];
  }

  if (!params.content) {
    err.content = ['Content should be not empty'];
  }

  if (Object.keys(err).length > 0) {
    return err;
  } else {
    return null;
  }
};