const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/edonationhub';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to database:', mongoUri);

    const email = 'anurag@edh.com';
    const rawPassword = 'admin1@anu';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'ADMIN';
      existingAdmin.status = 'ACTIVE';
      await existingAdmin.save();
      console.log('--------------------------------------------------');
      console.log('[Seed] Existing Admin account updated successfully!');
    } else {
      await User.create({
        name: 'System Admin 1',
        email,
        password: hashedPassword,
        phone: '1800-000-0000',
        address: 'eDonationHUB Central HQ',
        role: 'ADMIN',
        status: 'ACTIVE'
      });
      console.log('--------------------------------------------------');
      console.log('[Seed] New Admin account created successfully!');
    }

    console.log('Admin Email:    ' + email);
    console.log('Admin Password: ' + rawPassword);
    console.log('Role:           ADMIN');
    console.log('--------------------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err.message);
    process.exit(1);
  }
};

seedAdmin();

