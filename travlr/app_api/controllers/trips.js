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
    getUser(req, res, (req, res) => {
      Trip.create(
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
        (err, trip) => {
          if (err) {
            return res.status(400).json(err); // Bad request
          } else {
            return res.status(201).json(trip); // Created
          }
        }
      );
    });
  };
  

// PUT: /trips/:tripCode - Updates a Trip
// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
      Trip.findOneAndUpdate(
        { 'code': req.params.tripCode },
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
        { new: true }
      )
      .then(trip => {
        if (!trip) {
          return res.status(404).send({
            message: "Trip not found with code " + req.params.tripCode
          });
        }
        res.send(trip);
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Trip not found with code " + req.params.tripCode
          });
        }
        return res.status(500).json(err); // Server error
      });
    });
  };
  

const getUser = (req, res, callback) => {
    const userName = req.body.userName;  // Assuming userName is obtained from the request body
    const locationId = req.params.locationid;
  
    if (locationId) {
      Loc.findById(locationId)
        .select('reviews')
        .exec((err, location) => {
          if (err) {
            return res.status(400).json(err);
          } else {
            doAddReview(req, res, location, userName);  // Call the function with userName
          }
        });
    } else {
      res.status(404).json({ "message": "Location not found" });
    }
  };  

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    getUser
};