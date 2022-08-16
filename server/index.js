const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flightSchema = require("./Schemas/flightSchema");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://harmans497:Realmadrid@cluster0.8tjw52o.mongodb.net/stars?retryWrites=true&w=majority"
);

app.post("/getflightDetail", (req, res) => {
  try {
    const { flightName, originCity, destinationCity, departureDate } = req.body;

    flightSchema.find(
      {
        $and: [
          { flightName: flightName },
          { originCity: originCity },
          { destination: destinationCity },
          { departure: departureDate }
        ]
      },
      (err, result) => {
        if (err) {
          res.json(err);
        } else {
          // res.json(result);
          return res.status(200).send({ result });
        }
      }
    );
  } catch (error) {}
});

app.post("/setFlightDetails", async (req, res) => {
  const flight = req.body;
  console.log("here you are ");
  console.log("here you are ");
  console.log("here you are ");
  console.log(flight);
  const newFlight = new flightSchema(flight);
  await newFlight.save();

  return res.status(200).send("ok");
});

app.listen(5000, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
