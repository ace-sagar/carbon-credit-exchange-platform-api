import mongoose, { Schema, Document } from 'mongoose';

export interface ICarbonCredit extends Document {
  // creditId: string;
  type: string;
  price: number;
  projectDetails: object;
  availability: number;
}

const CarbonCreditSchema: Schema = new Schema(
  {
    // creditId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    projectDetails: { type: Schema.Types.Mixed, required: true },
    availability: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICarbonCredit>('CarbonCredit', CarbonCreditSchema);
