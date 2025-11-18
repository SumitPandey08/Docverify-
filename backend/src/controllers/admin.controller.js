import Admin from "../models/admin.model.js";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';


export const registerAdmin = [
    body('username').not().isEmpty().withMessage('Username is required').trim().escape(),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
      
        admin = new Admin({ username, email, password });
        await admin.save();  
        res.status(201).json({ 
            message: 'Admin registered successfully', 
            admin: {
                _id: admin._id,
                username: admin.username,
                email: admin.email
            } 
        });
    })
];

export const loginAdmin = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const token = admin.generateAuthToken();
        await admin.save();
        res.status(200).json({ message: 'Login successful', token, admin });
    })
];
