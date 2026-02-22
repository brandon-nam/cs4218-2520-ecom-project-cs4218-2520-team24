// Leong Yu Jun Nicholas A0257284W
import mongoose from "mongoose";
import Order from "./orderModel";

describe("Order Model Test", () => {

it("should create an order with default status", () => {
    const orderData = {
      products: [new mongoose.Types.ObjectId()],
      payment: { success: true },
      buyer: new mongoose.Types.ObjectId(),
    };
    
    const order = new Order(orderData);
    
    expect(order.status).toBe("Not Process");
    expect(order.products.length).toBe(1);
    expect(order.payment.success).toBe(true);
  });

  it("should fail validation if status is invalid", () => {
    const orderData = {
      status: "Invalid Status",
    };
    const order = new Order(orderData);
    
    const err = order.validateSync();
    
    expect(err.errors.status).toBeDefined();
    expect(err.errors.status.message).toContain("is not a valid enum value");
  });
});
