const express = require("express");
const cors = require("cors");
const app = express();
const validId = require("./utils/validId");
const ReservationModel = require("./models/ReservationModel");
const formatReservations = require("./formatReservations");

app.use(cors());
app.use(express.json());

app.get("/reservations", async (request, response) => {
    const reservations = await ReservationModel.find({});
    const normalReservations = reservations.map(formatReservations);

    response.status(200).send(normalReservations);
});

app.get("/reservations/:id", async (req, res) => {
    const id = req.params.id;

    if (!validId(id)){
       return res.sendStatus(400) 
    }

    const reservation = await ReservationModel.findById(id);

    if(reservation === null){
       return res.sendStatus(404)
    }

    const normalReservation = formatReservations(reservation);
          
    res.status(200).send(normalReservation);
});

module.exports = app;
 