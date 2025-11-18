import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true,
    },
    documentPic: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    authenticityScore: {
        type: Number,
        required: false,
    },
    adminVerification: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    userVerification: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
