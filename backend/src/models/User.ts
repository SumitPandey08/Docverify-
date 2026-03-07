import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  organizationId: mongoose.Types.ObjectId;
  personalIdNumber?: string;
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  personalIdNumber: { type: String }
});

export const User = mongoose.model<IUser>('User', UserSchema);

/**
 * VerificationRequest: The "Application" a user makes to verify a document.
 */
export interface IVerificationRequest extends Document {
  userId: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  documentType: string;
  filePath: string;
  status: 'pending' | 'verified' | 'rejected';
  verificationResults: any;
  createdAt: Date;
}

const VerificationRequestSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  documentType: { type: String, required: true },
  filePath: { type: String, required: true },
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  verificationResults: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

export const VerificationRequest = mongoose.model<IVerificationRequest>('VerificationRequest', VerificationRequestSchema);
