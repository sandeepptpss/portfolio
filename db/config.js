const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
    console.log('Database connected');
  } catch (err) {
    console.log('Error connecting to the database:', err);
  }
}


