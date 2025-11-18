import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';


export const registerUser = [
    body('username').not().isEmpty().withMessage('Username is required').trim().escape(),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
      
        user = new User({ username, email, password });
        await user.save();  
        res.status(201).json({ 
            message: 'User registered successfully', 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            } 
        });
    })
];

export const loginUser = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const token = user.generateAuthToken();
        await user.save();
        res.status(200).json({ message: 'Login successful', token, user });
    })
];

export const getMyOrganization = asyncHandler(async (req, res) => {
    // Assuming req.user is populated by an auth middleware
    const user = await User.findById(req.user._id).populate('organization');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ organization: user.organization });
});
