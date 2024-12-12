const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONG_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected successfully"))
.catch((error) => console.log("Connection error", error))
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
