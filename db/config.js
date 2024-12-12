// const mongoose = require('mongoose');
// main().catch(err => console.log(err));
// async function main() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('Database connected');
//   } catch (err) {
//     console.log('Error connecting to the database:', err);
//   }
// }
// const mongoose = require('mongoose');
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect(MONGO_URI)
// .then(() => console.log('MongoDB connected successfully'))
// .catch((error) => console.error('MongoDB connection error:', error));

const mongoose =require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(()=>console.log('MongoDB connected Successfully'))
.catch((error)=> console.error('Mongo connection error',error));

