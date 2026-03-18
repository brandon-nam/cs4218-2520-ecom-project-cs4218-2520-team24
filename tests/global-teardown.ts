import { stopMongo } from './mongodb-manager';

async function globalTeardown() {
  console.log('Stopping Global MongoMemoryServer...');
  await stopMongo();
  console.log('MongoMemoryServer stopped.');
}

export default globalTeardown;
