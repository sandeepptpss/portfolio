require('dotenv').config()
require('./db/config');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const router = express.Router();
const contactRouter = require('./routes/contact');
const userRouter =require('./routes/user')
const authRouter = require('./routes/auth');
//parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(process.env.PUBLIC_DIR));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use('/api/contact', contactRouter.router);
app.use('/api',userRouter.router);
app.use('/api',authRouter.router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});