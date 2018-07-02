import { dropCollections, closeConnection } from './utils';
import mongoose from 'mongoose';
import config from '../config';

let connection;
beforeAll(() => {
  connection = mongoose.connect(config.database.link, config.database.options);
});

// await or real connections closes
afterAll(async () => {
  dropCollections();
  await closeConnection(connection);
});
