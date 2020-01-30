const express = require("express");
const router = express.Router();
const Scooter = require("../model/scooter");
const { convertToGeoJSONObject } = require("../helpers/location-helper");

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/api/create-test-locations", async (req, res) => {
  const locations = [
    { latitude: 1.2765707, longitude: 103.845848 },
    { latitude: 1.275755, longitude: 103.8458999 },
    {
      latitude: 1.2744988451258414,
      longitude: 103.81358882904053
    },
    {
      latitude: 1.2750988451258414,
      longitude: 103.82358882904053
    },
    {
      latitude: 1.2640988451258414,
      longitude: 103.83358882904053
    },
    {
      latitude: 1.2844988451258414,
      longitude: 103.82358882904053
    },
    {
      latitude: 1.2934988451258414,
      longitude: 103.81358882904053
    },
    {
      latitude: 1.2811988451258414,
      longitude: 103.81358882904053
    },
    {
      latitude: 1.2807988451258414,
      longitude: 103.80358882904053
    }
  ];

  locations.forEach(location => {
    location = convertToGeoJSONObject(location.longitude, location.latitude);
    const scooter = new Scooter(location);

    scooter
      .save()
      .then(result => {
        console.log(result);
        res.json({ message: "success creating sample records.." });
      })
      .catch(error => {
        console.log(error.message);
      });
  });
});

router.get(
  "/api/get-nearby-scooters/:noOfScooters/:latitude/:longitude/:radiusMeters",
  (req, res, next) => {
    //http://localhost:3000/api/get-nearby-scooters/6/1.2765707/103.845848/6000
    let { noOfScooters, latitude, longitude, radiusMeters } = req.params;
    return Scooter.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: radiusMeters
        }
      }
    })
      .limit(parseInt(noOfScooters, 10))
      .then(result => {
        if (!result.length) return res.json();
        const scooters = [];
        result.forEach(scooter => {
          scooters.push({
            type: "Scooter",
            geometry: {
              type: "Point",
              coordinates: scooter.location.coordinates
            }
          });
        });
        const geoJsonData = {
          type: "ScooterCollection",
          features: scooters
        };
        res.json(geoJsonData);
      })
      .catch(next);
  }
);

router.post("/api/add/scooter", async (req, res) => {
  const location = convertToGeoJSONObject(
    req.body.longitude,
    req.body.latitude
  );
  const scooter = new Scooter(location);
  return scooter
    .save()
    .then(() => res.json({ Message: "Scooter location added successfully." }))
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = router;
