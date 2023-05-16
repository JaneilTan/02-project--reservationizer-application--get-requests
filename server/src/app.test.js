const request = require("supertest");
const app = require("./app");
const ReservationModel = require("./models/ReservationModel");
const formatReservations = require("./formatReservations");


describe("App", () => {
   
    test("GET /reservations should respond with a list of all reservations", async () => {
      const reservations = await ReservationModel.find({});
      const normalReservations = reservations.map(formatReservations);
  
      const expected = JSON.parse(JSON.stringify(normalReservations));
      const expectedStatusCode = 200;
  
      await request(app)
        .get("/reservations")
        .expect(expectedStatusCode)
        .expect((res) => {
          const body = res.body;
          expect(body).toEqual(expected);
        });
    });
});

test("Get /reservations/:id should respond with a single reservation", async () => {
    const reservations = await ReservationModel.findById("507f1f77bcf86cd799439011");
    const normalReservations = formatReservations(reservations);
    
    const expected = JSON.parse(JSON.stringify(normalReservations));
    

    await request(app)
    .get("/reservations/507f1f77bcf86cd799439011")
    .expect(200)
    .expect((res) => {
        const body = res.body;
        expect(body).toEqual(expected);
    });
});

test("Get /reservations/:id should respond with a 404 error with unknown ids", async () => {
    

    await request(app)
    .get("/reservations/527f1f77bcf86cd799439011")
    .expect(404)
    
});

test("Get /reservations/:id should respond with a 400 error with invalid ids", async () => {
    

    await request(app)
    .get("/reservations/111")
    .expect(400)
    
});