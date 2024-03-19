import { Schema, model } from "mongoose";

const Order = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    require: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema(
  {
    order: {
      type: [Order],
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    delivery_address: {
      type: String,
      required: true,
    },
    is_resolved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default model("Cart", CartSchema);
