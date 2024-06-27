//Bring in DB connection and the Trip Schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('../../data/trips.json', 'utf8'))

// delete any existing records, then insert seed data
const seedDb = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
}

// Close the MongoDB connection and exit
seedDb().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});