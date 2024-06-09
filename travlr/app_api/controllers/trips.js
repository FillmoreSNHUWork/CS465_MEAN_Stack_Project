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

module.exports = {
    tripsList,
    tripsFindByCode
};