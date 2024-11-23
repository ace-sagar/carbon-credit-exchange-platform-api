import mongoose, { Schema, Document } from 'mongoose';

interface ICarbonCredit extends Document {
  creditId: string;
  type: string;
  price: number;
  projectDetails: object;
  availability: number;
}

const CarbonCreditSchema: Schema<ICarbonCredit> = new Schema({
  creditId: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  projectDetails: { type: Object, required: true },
  availability: { type: Number, required: true },
});

const CarbonCredit = mongoose.model<ICarbonCredit>('CarbonCredit', CarbonCreditSchema);

export default CarbonCredit;
