import { startMongo } from './mongodb-manager';

async function globalSetup() {
  console.log('Starting Global MongoMemoryServer...');
  const mongoServer = await startMongo();
  const uri = mongoServer.getUri();
  process.env.MONGO_URL = uri;
  console.log(`MongoMemoryServer started at: ${uri}`);
}

export default globalSetup;
