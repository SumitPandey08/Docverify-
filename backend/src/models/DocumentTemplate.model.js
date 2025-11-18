import mongoose from "mongoose";

const documentTemplateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    image : {
        type: String,
        required: false,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },  
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    
}, {
    timestamps: true,
});

const DocumentTemplate = mongoose.model('DocumentTemplate', documentTemplateSchema);

export default DocumentTemplate;