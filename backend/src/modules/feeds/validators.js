export function feed(params) {
  const err = {};
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
}

export function id(id) {
  return /^[0-9a-fA-F]{24}$/.test(id) ? null : { _id: 'Incorrect id' };
}
