import glob from 'glob';
import Router from 'koa-router';

module.exports = function initModules(app) {
  /* eslint import/no-dynamic-require: 0 */
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err; }

    matches.forEach((mod) => {
      const router = require(`${mod}/router`);

      const routes = router.default;
      const baseUrl = router.baseUrl;
      const instance = new Router({ prefix: baseUrl });

      routes.forEach((config) => {
        const {
          method = '',
          route = '',
          handlers = []
        } = config;

        const lastHandler = handlers.pop();

        instance[method.toLowerCase()](route, ...handlers, async (ctx) => {
          const result = await lastHandler(ctx);
          return result;
        });

        app
          .use(instance.routes())
          .use(instance.allowedMethods());
      });
    });
  });
};
