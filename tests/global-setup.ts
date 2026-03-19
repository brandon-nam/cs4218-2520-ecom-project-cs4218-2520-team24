import { startMongo } from './mongodb-manager';
import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';

async function globalSetup() {
  console.log('Starting Global MongoMemoryServer...');
  const mongoServer = await startMongo();
  const uri = mongoServer.getUri();
  process.env.MONGO_URL = uri;
  console.log(`MongoMemoryServer started at: ${uri}`);

  // Seed data
  await mongoose.connect(uri);
  try {
    console.log('--- SEEDING START ---');
    
    // 1. Seed Category
    let category = await Category.findOne({ slug: 'electronics' });
    if (!category) {
      category = await new Category({
        name: 'Electronics',
        slug: 'electronics',
      }).save();
      console.log('Seeded Category: Electronics');
    } else {
      console.log('Category already exists: Electronics');
    }

    // 2. Seed Smartphone
    let smartphone = await Product.findOne({ slug: 'smartphone' });
    if (!smartphone) {
      await new Product({
        name: 'Smartphone',
        slug: 'smartphone',
        description: 'A very smart phone for the test',
        price: 999,
        category: category._id,
        quantity: 10,
        shipping: true
      }).save();
      console.log('Seeded Product: Smartphone');
    } else {
      console.log('Product already exists: Smartphone');
    }

    // 3. Seed Tablet
    let tablet = await Product.findOne({ slug: 'tablet' });
    if (!tablet) {
      await new Product({
        name: 'Tablet',
        slug: 'tablet',
        description: 'A great tablet for testing similar products',
        price: 599,
        category: category._id,
        quantity: 15,
        shipping: true
      }).save();
      console.log('Seeded Product: Tablet');
    } else {
      console.log('Product already exists: Tablet');
    }
    
    console.log('--- SEEDING END ---');
  } catch (err) {
    console.error('CRITICAL SEED ERROR:', err);
  } finally {
    await mongoose.disconnect();
  }
}

export default globalSetup;
