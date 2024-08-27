const mongoose = require("mongoose")

const dbconnect = async()=>{
   
    await  mongoose.connect("mongodb+srv://Alumini:Alumini@cluster0.jathl.mongodb.net/Alumini?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
   
}

module.exports =dbconnect;