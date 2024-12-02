require('dotenv').config()
require('./db/config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer');
const router = express.Router();
const contactRouter = require('./routes/contact');
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth');
const portfolioRouter = require('./routes/portfolio');
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    // Ensure the file has its original extension
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});
// Use Multer with storage configuration
const upload = multer({ storage });
app.use(upload.any())
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api/contact', contactRouter.router);
app.use('/api', userRouter.router);
app.use('/api', authRouter.router);
app.use('/api', portfolioRouter.router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Start ${PORT}`);
});