const mongoose = require("mongoose");
require("dotenv").config();
const DEBUG = process.env.DEBUG;
async function connect() {
    const options = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };
    mongoose.connect("mongodb://localhost:27017/hospital_app", options);
    const connection = mongoose.connection;

    connection.once("open", () => {
        if (DEBUG) {
            console.log("MongoDB database connection is successfully established");
        }
        return connection;
    });
}  
module.exports = connect;