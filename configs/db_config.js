const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://washnowdb:washnowdb@washnowcluster.5qeq2qb.mongodb.net/washnowdb?retryWrites=true&w=majority"
  )
  .then((_) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
