// const mongoose = require("mongoose");

// function connectDB() {
//   const url =
//     "mongodb+srv://washnowdb:washnowdb@washnowcluster.5qeq2qb.mongodb.net/?retryWrites=true&w=majority/washnowdb";

//   try {
//     mongoose.connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   const dbConnection = mongoose.connection;
//   dbConnection.once("open", (_) => {
//     console.log(`Database connected`);
//   });

//   dbConnection.on("error", (err) => {
//     console.error(`Connection error: ${err}`);
//   });

//   return;
// }

// module.exports = connectDB();

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
