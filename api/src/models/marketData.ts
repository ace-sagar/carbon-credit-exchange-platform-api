import mongoose, { Schema, Document } from 'mongoose';

export interface IMarketData extends Document {
  creditId: mongoose.Types.ObjectId;
  priceHistory: Array<{ date: Date; price: number }>;
  tradingVolume: number;
}

const MarketDataSchema: Schema = new Schema(
  {
    creditId: { type: mongoose.Schema.Types.ObjectId, ref: 'CarbonCredit', required: true },
    priceHistory: {
      type: [
          {
              date: { type: Date, required: true },
              price: { type: Number, required: true, min: 0 }, // Added validation
          },
      ],
      default: [], // Set default value
  },
  tradingVolume: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IMarketData>('MarketData', MarketDataSchema);
