import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUploadedAsset extends Document {
  userId: mongoose.Types.ObjectId;
  cloudinaryUrl: string;
  publicId: string;
  format: string;
  size: number;
  createdAt: Date;
}

const UploadedAssetSchema: Schema<IUploadedAsset> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cloudinaryUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  format: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UploadedAsset: Model<IUploadedAsset> = mongoose.models.UploadedAsset || mongoose.model<IUploadedAsset>('UploadedAsset', UploadedAssetSchema);

export default UploadedAsset;
