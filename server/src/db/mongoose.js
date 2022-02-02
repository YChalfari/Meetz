const mongoose = require("mongoose");
require("dotenv").config();
console.log("mongopw", process.env.MONGO_PW);
const uri = `mongodb+srv://chalfari:${process.env.MONGO_PW}@yitz.jupy6.mongodb.net/gatherTOWN?retryWrites=true&w=majority`;
mongoose.connect(uri, {});
