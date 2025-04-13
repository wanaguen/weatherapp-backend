const mongoose = require("mongoose");

const connectionString = "mongodb+srv://tlecoeur:Putain2merde@cluster0.cgmf2qe.mongodb.net/weatherapp-part4";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
