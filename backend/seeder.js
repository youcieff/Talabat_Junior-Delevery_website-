const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config();

const seedAdmin = async () => {
  try {
    console.log('Connecting to database...');
    // Ensure we await the connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to:', process.env.MONGO_URI);

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@talabat.jr' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Create Admin
    await User.create({
      name: 'Site Manager',
      email: 'admin@talabat.jr',
      password: 'admin123',
      phone: '01000000000',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully:');
    console.log('Email: admin@talabat.jr');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
