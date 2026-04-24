import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  avatar?: string;
  plan: 'free' | 'pro';
  createdAt: Date;
  lastLogin?: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  avatar: { type: String },
  plan: { type: String, enum: ['free', 'pro'], default: 'free' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
