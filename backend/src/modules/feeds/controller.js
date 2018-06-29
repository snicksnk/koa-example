import Feed from '../../models/feeds';
import { feed as feedValidator } from './validators';

export async function create(ctx) {
  const { user } = ctx.state;

  const params = ctx.request.smartParams;

  const err = feedValidator(params);
  if (err) {
    ctx.body = {
      _errors: err
    };
    ctx.status = 400;
    return;
  }

  console.log('controllers-err', err);

  const entityFields = {
    ...params,
    creator: user._id
  };

  const entity = new Feed(entityFields);
  await entity.save();
  ctx.body = { feed: entity };
}

export async function get(ctx) {
  const entitys = await Feed.find();
  ctx.body = { feeds: entitys };
}

export async function getOne(ctx, next) {
  const { user } = ctx.state;
  const { id } = ctx.request.smartParams;
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

  const err = feedValidator(params);
  if (err) {
    ctx.body = {
      _errors: err
    };
    ctx.status = 400;
    return;
  }

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

export async function remove(ctx) {
  const { user } = ctx.state;
  const { feed } = ctx.body;

  if (!feed.creator.equals(user._id)) {
    ctx.throw(403);
  }

  await feed.remove();

  ctx.status = 200;
  ctx.body = {
    success: true
  };
}

/*
export async function getMaps(ctx) {
  const { user } = ctx.state;
  const maps = await Map.find({ creator: user._id });
  ctx.body = { maps };
}

export async function getMap(ctx, next) {
  // TODO add id validator
  const { user } = ctx.state;
  const { id } = ctx.request.smartParams;
  const map = await Map.findById(id);
  const nodes = await Node.find({ map: id });
  console.log('😈 ---', nodes, map);

  if (!map) {
    ctx.throw(404);
  }

  if (!map.creator.equals(user._id)) {
    ctx.throw(403);
  }

  ctx.body = {
    map: { ...map._doc, nodes }
  };

  if (next) {
    return next();
  }
}

export async function updateMap(ctx) {
  const { map } = ctx.body;
  const mapFields = {
    ...ctx.request.smartParams,
  };

  Object.assign(map, mapFields);
  await map.save();
  ctx.body = {
    map
  };
}

export async function deleteMap(ctx) {
  const map = ctx.body.map;
  await map.remove();

  ctx.status = 200;
  ctx.body = {
    success: true
  };
}
*/