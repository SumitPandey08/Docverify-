import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Organization } from './src/models/Organization.js';
import { User } from './src/models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/docverify';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Organization.deleteMany({});
    await User.deleteMany({});

    // 1. Create a sample Organization
    const org = new Organization({
      name: "Global Tech University",
      email: "admin@globaltech.edu",
      apiKey: "sk_globaltech_demo_12345",
      documentModels: [
        {
          name: "Degree Certificate",
          fields: [
            { name: "Student Name", type: "string" },
            { name: "Degree", type: "string" },
            { name: "Issue Date", type: "date" },
            { name: "Serial Number", type: "string" }
          ],
          validityDays: 3650
        }
      ]
    });
    await org.save();
    console.log('Sample Organization created:', org.name);

    // 2. Create a sample User
    const user = new User({
      fullName: "Sumit Kumar",
      email: "sumit@example.com",
      organizationId: org._id,
      personalIdNumber: "STU-2024-001"
    });
    await user.save();
    console.log('Sample User created:', user.fullName);

    console.log('\nSeeding complete!');
    console.log('Use these IDs for testing:');
    console.log('Organization ID:', org._id);
    console.log('User ID:', user._id);
    console.log('User Email:', user.email);
    console.log('\nLogin as User with sumit@example.com or Org with admin@globaltech.edu');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
