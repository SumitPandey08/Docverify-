import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  email: string;
}

const AdminSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
