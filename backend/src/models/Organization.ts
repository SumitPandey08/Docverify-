import mongoose, { Schema, Document } from 'mongoose';

/**
 * Organization: Can define its own document "models" (what it expects in a doc).
 * And also hold data for its own users.
 */
interface IDocumentField {
  name: string;
  type: 'text' | 'number' | 'date' | 'email';
  isRequired: boolean;
  validationRegex?: string;
}

interface IDocumentModel {
  name: string;
  fields: IDocumentField[]; // Detailed fields definition
  validityDays?: number;
  modelImagePath?: string; // Path to the reference template image
}

export interface IOrganization extends Document {
  name: string;
  email: string;
  password?: string;
  apiKey: string;
  documentModels: IDocumentModel[];
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  apiKey: { type: String, required: true, unique: true },
  documentModels: [{
    name: { type: String, required: true },
    fields: [{
      name: { type: String, required: true },
      type: { type: String, enum: ['text', 'number', 'date', 'email'], default: 'text' },
      isRequired: { type: Boolean, default: true },
      validationRegex: { type: String }
    }],
    validityDays: { type: Number },
    modelImagePath: { type: String }
  }]
});

export const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);
