const app = require("./app");
const connect = require("./MongoDB/MongoConnection");
const port = process.env.PORT || 8000;
require("dotenv").config();
const DEBUG = process.env.DEBUG;
connect()
  .then((result) => {
    try {
      app.listen(port, () => {
        if (DEBUG) {
          console.log(`Server is running on port: ${port}`);
        }
      });
    } catch (error) {
      if (DEBUG) {
        console.log("Can not connect to server");
      }
    }
  })
  .catch((err) => {
    if (DEBUG) {
      console.log(err);
      console.log("Invalid database connection");
    }
  });
