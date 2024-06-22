const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// All responses include HTML status
// JSON message included as well
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return everything
        .exec();

        // Remove comment to show query results
        console.log(q); 

        if(!q)
            { // DB returned no data
                return res
                        .status(404)
                        .json(err);
            } else { // Return trip list
                return res
                    .status(200)
                    .json(q);
            }

};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // return single record
        .exec();

        // Uncomment to debug
        // console.log(q);

    if(!q)
        {// No data returned
            return res
                .status(404)
                .json(err);
        } else {
            return res
            .status(200)
            .json(q);
        }
}

const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const q = await newTrip.save();
        return res.status(201).json(q);
    } catch (err) {
        return res.status(400).json(err);
    }
}

// PUT: /trips/:tripCode - Updates a Trip
// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    try {
        const q = await Model.findOneAndUpdate(
            { 'code' : req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true, runValidators: true } // Options to return the new document and run validations
        ).exec();

        if(!q) {
            // Database returned no data
            return res
                .status(400)
                .json({ message: 'Trip not found or not updated' });
        } else {
            // Return resulting updated trip
            return res
                .status(201)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json(err);
    }
    // Uncomment the following line to show results of operation on the console
    // console.log(q);
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};