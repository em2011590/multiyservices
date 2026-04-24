import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IServiceHistory extends Document {
  userId: mongoose.Types.ObjectId;
  serviceType: string;
  inputSnapshot: string;
  outputSnapshot: string;
  createdAt: Date;
}

const ServiceHistorySchema: Schema<IServiceHistory> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true },
  inputSnapshot: { type: String, required: true },
  outputSnapshot: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ServiceHistory: Model<IServiceHistory> = mongoose.models.ServiceHistory || mongoose.model<IServiceHistory>('ServiceHistory', ServiceHistorySchema);

export default ServiceHistory;
