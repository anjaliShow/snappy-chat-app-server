const mongoose = require("mongoose");

const connectdatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((data) =>
      console.log(`mongodb connected with ${data.connection.host}`)
    )
    .catch((err) => console.log(err));
};

module.exports = connectdatabase;

// const mongoose = require("mongoose");

// const databaseConnect = () => {
//   mongoose
//     .connect(process.env.DATABASE_URL)
//     .then(() => {
//       console.log("MongoDB database connect...");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// module.exports = databaseConnect;
