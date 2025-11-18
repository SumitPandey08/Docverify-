import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    idealDocPic : {
        type: Buffer, // Changed from String to Buffer
        required: true,
    },
    content: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'DocumentTemplate',
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    createdAt: {    
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    documentType: {
        type: String,
        enum: ['legacy', 'digital'],
        default: 'legacy',
        required: true,
    },
});

// Update the updatedAt field before saving
documentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
