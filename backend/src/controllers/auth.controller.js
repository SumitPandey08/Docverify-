import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import Admin from "../models/admin.model.js";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

export const login = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').not().isEmpty().withMessage('Password is required'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = user.generateAuthToken();
            await user.save();
            return res.status(200).json({ message: 'Login successful', token, user, userType: 'user' });
        }

        let organization = await Organization.findOne({ email });
        if (organization) {
            const isMatch = await organization.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = organization.generateAuthToken();
            await organization.save();
            return res.status(200).json({ message: 'Login successful', token, user: organization, userType: 'organization' });
        }

        let admin = await Admin.findOne({ email });
        if (admin) {
            const isMatch = await admin.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = admin.generateAuthToken();
            await admin.save();
            return res.status(200).json({ message: 'Login successful', token, user: admin, userType: 'admin' });
        }

        return res.status(400).json({ message: 'Invalid email or password' });
    })
];
