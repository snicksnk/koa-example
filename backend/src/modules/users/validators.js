export function user(params) {
  const err = {};
  if (!params.username) {
    err.username = ['Username should be not empty'];
  }

  if (!params.password) {
    err.password = ['Password should be not empty'];
  }

  if (params.password && params.password.length < 6) {
    err.password = ['Password must be at least 6 characters'];
  }

  if (Object.keys(err).length > 0) {
    return err;
  } else {
    return null;
  }
}
