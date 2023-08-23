const mongoose = require("mongoose");

const uri = "mongodb+srv://cubenbits:" + process.env.API_KEY + "@icluster.kiuylnu.mongodb.net/?retryWrites=true&w=majority";

const connectDB = ()=>{
    mongoose.connect(uri, {
        useNewUrlParser: true
    });
}

module.exports = connectDB;