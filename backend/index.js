import express from 'express';
import userRoute from './src/routes/user.route.js';
import organizationRoute from './src/routes/organization.route.js';
import documentRoute from './src/routes/document.route.js';
import adminRoute from './src/routes/admin.route.js';
import authRoute from './src/routes/auth.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import dbConnect from './src/config/dbConnect.js';
import cors from 'cors';


dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
dbConnect();

// Routes
app.use('/api/users', userRoute);
app.use('/api/organizations', organizationRoute);
app.use('/api/documents', documentRoute);
app.use('/api/admin', adminRoute);
app.use('/api/auth', authRoute);


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
