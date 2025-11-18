import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);  
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
}
);
// Method to compare password
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    this.accessToken = token;
    return token;
}


const Admin = mongoose.model('Admin', adminSchema);

export default Admin;