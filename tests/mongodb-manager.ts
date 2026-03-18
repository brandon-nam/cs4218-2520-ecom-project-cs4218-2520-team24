import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export async function startMongo() {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URL = mongoServer.getUri();
  }
  return mongoServer;
}

export async function stopMongo() {
  if (mongoServer) {
    await mongoServer.stop();
  }
}

export function getMongoUri() {
  return mongoServer ? mongoServer.getUri() : null;
}
