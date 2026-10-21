const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const NGO = require('./models/NGO');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edonationhub';

const seedNGO = async () => {
  try {
    console.log('[Seeder] Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('[Seeder] Connected successfully.');

    const ngoEmail = 'ngo@edonationhub.org';
    const rawPassword = 'password123'; // Change as desired

    // Check if the NGO account already exists
    let existingNgoUser = await User.findOne({ email: ngoEmail });

    if (existingNgoUser) {
      console.log(`[Seeder] NGO account already exists (${ngoEmail}). Updating credentials...`);
      existingNgoUser.password = await bcrypt.hash(rawPassword, 10);
      existingNgoUser.role = 'NGO';
      existingNgoUser.status = 'ACTIVE';
      await existingNgoUser.save();
    } else {
      console.log(`[Seeder] Creating fresh NGO account (${ngoEmail})...`);
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      existingNgoUser = await User.create({
        name: 'eDonationHub Primary Foundation',
        email: ngoEmail,
        password: hashedPassword,
        phone: '9876543210',
        address: 'Ghatkopar East, Mumbai, Maharashtra 400077',
        role: 'NGO',
        status: 'ACTIVE'
      });
    }

    // Upsert the NGO Profile document
    let ngoProfile = await NGO.findOne({ user: existingNgoUser._id });
    if (!ngoProfile) {
      ngoProfile = await NGO.create({
        user: existingNgoUser._id,
        ngoName: 'eDonationHub Foundation',
        registrationNumber: 'NGO-MH-MUM-2026-001',
        contactPerson: 'Operations Lead',
        contactPhone: '9876543210',
        contactEmail: ngoEmail,
        officeAddress: 'Ghatkopar East, Mumbai, Maharashtra 400077',
        documentUrl: '',
        approvalStatus: 'APPROVED'
      });
      console.log('[Seeder] NGO Profile linked.');
    } else {
      ngoProfile.approvalStatus = 'APPROVED';
      await ngoProfile.save();
    }

    console.log('\n===============================================');
    console.log('  NGO ACCOUNT READY FOR LOGIN');
    console.log('===============================================');
    console.log(`  Email    : ${ngoEmail}`);
    console.log(`  Password : ${rawPassword}`);
    console.log('  Role     : NGO');
    console.log('  Status   : ACTIVE');
    console.log('===============================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seeder Failed]:', error);
    process.exit(1);
  }
};

seedNGO();