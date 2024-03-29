const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seedFile = require("../db/seed");

beforeEach(() => {
  return seedFile();
});

afterAll(() => {
  return db.end();
});

describe("app", () => {
  describe("GET", () => {
    describe("/api/healthcheck", () => {
      test("should respond with a 200 status code", () => {
        return request(app).get("/api/healthcheck").expect(200);
      });
    });
    describe("/api/parks", () => {
      test("should respond with a 200 status code", () => {
        return request(app).get("/api/parks").expect(200);
      });
      test("respond with an array of park objects with properties park_id, park_name and year_opened", () => {
        return request(app)
          .get("/api/parks")
          .then(({ body }) => {
            const { parks } = body;
            expect(Array.isArray(parks)).toBe(true);
            parks.forEach((park) => {
              expect(typeof park.park_id).toBe("number");
              expect(typeof park.park_name).toBe("string");
              expect(typeof park.year_opened).toBe("number");
            });
          });
      });
    });
    describe("/api/ride/:ride_id", () => {
      test("should respond with a 200 status code", () => {
        return request(app).get("/api/ride/1").expect(200);
      });
      test("should respond with a ride object with properties ride_id, ride_name, year_opened, park_name, votes", () => {
        return request(app)
          .get("/api/ride/1")
          .then(({ body }) => {
            const { ride } = body;

            expect(typeof ride.ride_id).toBe("number");
            expect(typeof ride.ride_name).toBe("string");
            expect(typeof ride.year_opened).toBe("number");
            expect(typeof ride.park_name).toBe("string");
            expect(typeof ride.votes).toBe("number");
          });
      });
    });
    describe("/api/parks/:park_id", () => {
      test("should response with 200 status code and the corrent park object", () => {
        return request(app)
          .get("/api/parks/1")
          .expect(200)
          .then(({ body }) => {
            const { park } = body;
            expect(typeof park.park_id).toBe("number");
            expect(typeof park.park_name).toBe("string");
            expect(typeof park.year_opened).toBe("number");
            expect(typeof park.annual_attendance).toBe("number");
            expect(typeof park.average_votes).toBe("number");
            expect(typeof park.ride_count).toBe("number");
          });
      });
    });
  });

  describe("POST", () => {
    describe("/api/parks/:park_id/rides", () => {
      test("should respond with a 201 status code and newRide", () => {
        const newRide = {
          ride_name: "new ride",
          year_opened: 2024,
        };
        return request(app)
          .post("/api/parks/1/rides")
          .send(newRide)
          .expect(201)
          .then((response) => {
            expect(response.body).toEqual({
              ride: {
                ride_id: 21,
                park_id: 1,
                ride_name: "new ride",
                votes: 0,
                year_opened: 2024,
              },
            });
          });
      });
      test("should respond with a 201 status code and newRide to different park", () => {
        const newRide2 = {
          ride_name: "another new ride",
          year_opened: 2024,
        };
        return request(app)
          .post("/api/parks/2/rides")
          .send(newRide2)
          .expect(201)
          .then((response) => {
            expect(response.body).toEqual({
              ride: {
                ride_id: 21,
                park_id: 2,
                ride_name: "another new ride",
                votes: 0,
                year_opened: 2024,
              },
            });
          });
      });
    });
  });

  describe("PATCH", () => {
    describe("/api/rides/:ride_id", () => {
      test("should respond with a 200 status code and updated ride data", () => {
        const newData = { ride_name: "new ride name" };
        return request(app)
          .patch("/api/rides/2")
          .send(newData)
          .expect(200)
          .then((response) => {
            expect(response.body).toEqual({
              ride: {
                ride_id: 2,
                ride_name: "new ride name",
                year_opened: 2006,
                park_id: 1,
                votes: 4,
              },
            });
          });
      });
    });
  });
  describe("DELETE", () => {
    describe("/api/rides/:ride_id", () => {
      test("should repond with a 204 status code", () => {
        return request(app).delete("/api/rides/2").expect(204);
      });
      test("should respond with a 404 status code when trying to get a ride that has been deleted or doesn't exist", () => {
        return request(app)
          .get("/api/ride/30")
          .expect(400)
          .then((response) => {
            console.log(response);
          });
      });
    });
  });
});
