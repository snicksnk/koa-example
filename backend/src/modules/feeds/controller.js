import Feed from '../../models/feeds';
import { feed as feedValidator, id as idValidator } from './validators';

export async function create(ctx) {
  const { user } = ctx.state;

  const params = ctx.request.smartParams;

  const errors = feedValidator(params);
  if (errors) {
    ctx.body = {
      errors
    };
    ctx.status = 400;
  } else {
    const entityFields = {
      ...params,
      creator: user._id
    };

    const entity = new Feed(entityFields);
    await entity.save();
    ctx.body = { feed: entity };
  }
}

export async function get(ctx) {
  const entitys = await Feed.find();
  ctx.body = { feeds: entitys };
}

export async function getOne(ctx, next) {
  const { id } = ctx.request.smartParams;

  if (idValidator(id)) {
    ctx.throw(404);
  }

  const entity = await Feed.findById(id);

  if (!entity) {
    ctx.throw(404);
  }

  ctx.body = {
    feed: entity
  };

  if (next) {
    return next();
  }
}

export async function update(ctx) {
  const params = ctx.request.smartParams;
  const { user } = ctx.state;
  const { feed } = ctx.body;

  const errors = feedValidator(params);
  if (errors) {
    ctx.body = {
      errors
    };
    ctx.status = 400;
  } else {
    if (!feed.creator.equals(user._id)) {
      ctx.throw(403);
    }

    const entityFields = {
      ...params,
    };

    Object.assign(feed, entityFields);
    await feed.save();
    ctx.body = {
      feed
    };
  }
}

export async function remove(ctx) {
  const { user } = ctx.state;
  const { feed } = ctx.body;

  if (!feed.creator.equals(user._id)) {
    ctx.throw(403);
  }

  await feed.remove();

  ctx.status = 200;
  ctx.body = {
    _id: feed._id
  };
}
