const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edonationhub';
    console.log(`[MongoDB]: Connecting to ${mongoUri}...`);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MongoDB Connected]: Host -> ${conn.connection.host}, DB -> ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;