import mongoose, { Schema, Document } from 'mongoose';

// Enum for roles
export enum UserRole {
  Individual = 'Individual',
  Company = 'Company',
  Admin = 'Admin'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  portfolio: Array<mongoose.Types.ObjectId>; 
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, required: true, default: UserRole.Individual },
    portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CarbonCredit' }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
