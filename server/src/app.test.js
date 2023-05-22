const request = require("supertest");
const app = require("./app");
const ReservationModel = require("./models/ReservationModel");
const formatReservations = require("./formatReservations");


describe("App", () => {
   
    test("GET /reservations should respond with a list of all reservations", async () => {
      
  
      const expected = [
        {
          id: "507f1f77bcf86cd799439011",
          partySize: 4,
          date: "2023-11-17T06:30:00.000Z",
          userId: "614abe145f317b89a2e36883",
          restaurantName: "Island Grill"
        },
        {
          id: "614abf0a93e8e80ace792ac6",
          partySize: 2,
          date: "2023-12-03T07:00:00.000Z",
          userId: "614abe145f317b89a2e36883",
          restaurantName: "Green Curry"
        },
      ];
      
  
      await request(app)
        .get("/reservations")
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(expected);
        });
    });
});

test("Get /reservations/:id should respond with a single reservation", async () => {
    
    
    const expected = {
            id: "507f1f77bcf86cd799439011",
            partySize: 4,
            date: "2023-11-17T06:30:00.000Z",
            userId: "614abe145f317b89a2e36883",
            restaurantName: "Island Grill"
        };

    

    await request(app)
    .get("/reservations/507f1f77bcf86cd799439011")
    .expect(200)
    .expect((res) => {
        expect(res.body).toEqual(expected);
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