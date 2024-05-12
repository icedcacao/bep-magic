const { model, Schema } = require("mongoose");

const cartSchema = new Schema(
  {
    orders: {
      type: [
        {
          food: {
            _id: String,
            name: String,
            price: Number,
          },
          subtotal: { type: Number, min: 0 },
          quantity: { type: Number, min: 1, required: true },
        },
      ],
      required: true,
    },
    grand_total: {
      type: Number,
      min: 0,
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
    status: {
      type: String,
      enum: ["pending", "paid", "delivered"],
      required: true,
      default: "pending",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Cart", cartSchema);
