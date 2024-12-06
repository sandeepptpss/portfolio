const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (err) {
    console.log('Error connecting to the database:', err);
  }
}


