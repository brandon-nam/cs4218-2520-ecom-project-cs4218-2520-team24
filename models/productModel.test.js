// Leong Yu Jun Nicholas A0257284W
import mongoose from "mongoose";
import Product from "./productModel";

describe("Product Model Test", () => {
  beforeEach(() => {
    // Setup if needed
  });

  afterEach(() => {
    // Teardown if needed
  });

  it("should create a product successfully", () => {
    const productData = {
      name: "Test Product",
      slug: "test-product",
      description: "Test Description",
      price: 100,
      category: new mongoose.Types.ObjectId(),
      quantity: 10,
      shipping: true,
    };
    const product = new Product(productData);
    
    const err = product.validateSync();
    
    expect(err).toBeUndefined();
    expect(product.name).toBe(productData.name);
  });

  it("should fail validation if required fields are missing", () => {
    const product = new Product({});
    
    const err = product.validateSync();
    
    expect(err.errors.name).toBeDefined();
    expect(err.errors.slug).toBeDefined();
    expect(err.errors.description).toBeDefined();
    expect(err.errors.price).toBeDefined();
    expect(err.errors.category).toBeDefined();
    expect(err.errors.quantity).toBeDefined();
  });
});
