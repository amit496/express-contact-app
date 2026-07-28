import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/contactus-crud');
        console.log("Database connected successfully.");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Optional: Exit the application if DB connection fails
    }
};

export default connectDB;