import mongoose, { Schema, Document } from 'mongoose';

export interface IDocumentCreationRequest extends Document {
  userId: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  documentModelName: string; // The name of the template from Organization.documentModels
  formData: any; // Using any for Mixed type to allow flexible keys
  status: 'pending' | 'approved' | 'rejected' | 'created';
  generatedDocumentPath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentCreationRequestSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  documentModelName: { type: String, required: true },
  formData: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'created'], default: 'pending' },
  generatedDocumentPath: { type: String },
}, { timestamps: true });

export const DocumentCreationRequest = mongoose.model<IDocumentCreationRequest>('DocumentCreationRequest', DocumentCreationRequestSchema);
