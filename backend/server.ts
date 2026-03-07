import app from "./src/app.js";
import dotenv from 'dotenv';
import { connectDB } from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log('--- Server Initializing ---');
console.log('Environment PORT:', process.env.PORT);
console.log('Using PORT:', PORT);

// Connect to Database
console.log('Attempting to connect to MongoDB...');
connectDB().then(() => {
  console.log('Database connection logic finished.');
}).catch(err => {
  console.error('Database connection critical failure:', err);
});

app.listen(PORT, () => {
    console.log(`Server is successfully running on http://localhost:${PORT}`);
});
