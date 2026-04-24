import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISavedEndpoint extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  createdAt: Date;
}

const SavedEndpointSchema: Schema<ISavedEndpoint> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: Map, of: String, default: {} },
  body: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const SavedEndpoint: Model<ISavedEndpoint> = mongoose.models.SavedEndpoint || mongoose.model<ISavedEndpoint>('SavedEndpoint', SavedEndpointSchema);

export default SavedEndpoint;
