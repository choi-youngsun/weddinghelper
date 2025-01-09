import mongoose from 'mongoose';

// 하객 수를 관리하는 스키마
const orderNumberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  side: String, // bride 또는 groom
  lastOrderNumber: { type: Number, default: 0 },
});

const OrderNumber =
  mongoose.models['OrderNumber'] ||
  mongoose.model('OrderNumber', orderNumberSchema);

export default OrderNumber;
