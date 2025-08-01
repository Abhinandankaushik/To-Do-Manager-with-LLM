import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
}

export default dbConnect