import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  orderId: string;
  userId: string;
  creditId: string;
  orderType: 'Buy' | 'Sell';
  quantity: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  creditId: { type: String, required: true },
  orderType: { type: String, enum: ['Buy', 'Sell'], required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
