import mongoose, { Schema, Document } from 'mongoose';

interface ITransaction extends Document {
  transactionId: string;
  userId: string;
  creditId: string;
  quantity: number;
  price: number;
  totalAmount: number;
  transactionDate: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema({
  transactionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  creditId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
});

const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
