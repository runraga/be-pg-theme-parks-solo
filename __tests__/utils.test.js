/* make sure you write your tests for your utils functions in here :eyes: */
const formatRideData = require("../db/utils");

describe("formatRideData()", () => {
  test("should return an array", () => {
    const rides = [];
    const parks = [
      {
        park_id: 0,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];
    expect(formatRideData(rides, parks)).toEqual([]);
  });
  test("when passed one ride, should return an array containing an array with ride_name, year_opened and votes", () => {
    const rides = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Thorpe Park",
        votes: 5,
      },
    ];
    const parks = [
      {
        park_id: 0,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];
    const formattedRide = formatRideData(rides, parks);

    expect(formattedRide[0].ride_name).toBe("Colossus");
    expect(formattedRide[0].year_opened).toBe(2002);
    expect(formattedRide[0].votes).toBe(5);
  });
  test("when passed multiple rides, should return an array containing an array for each ride with ride_name, year_opened and votes", () => {
    const rides = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Thorpe Park",
        votes: 5,
      },
      {
        ride_name: "Stealth",
        year_opened: 2006,
        park_name: "Thorpe Park",
        votes: 4,
      },
    ];
    const parks = [
      {
        park_id: 0,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];
    const formattedRide = formatRideData(rides, parks);

    expect(formattedRide[0].ride_name).toBe("Colossus");
    expect(formattedRide[0].year_opened).toBe(2002);
    expect(formattedRide[0].votes).toBe(5);

    expect(formattedRide[1].ride_name).toBe("Stealth");
    expect(formattedRide[1].year_opened).toBe(2006);
    expect(formattedRide[1].votes).toBe(4);
  });
  test("when passed one ride, returned array should contain one array with ride_id as last element", () => {
    const rides = [
      {
        ride_name: "Stealth",
        year_opened: 2006,
        park_name: "Thorpe Park",
        votes: 4,
      },
    ];
    const parks = [
      {
        park_id: 0,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];

    const formattedRide = formatRideData(rides, parks);

    expect(formattedRide[0].park_id).toBe(0);
  });
  test("when passed multiple rides from different parks, returned array should contain one array for each ride with park_id as last element", () => {
    const rides = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Alton Towers",
        votes: 5,
      },
      {
        ride_name: "Stealth",
        year_opened: 2006,
        park_name: "Thorpe Park",
        votes: 4,
      },
    ];
    const parks = [
      {
        park_id: 0,
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
      {
        park_id: 1,
        park_name: "Thorpe Park",
        year_opened: 1979,
        annual_attendance: 1700000,
      },
    ];
    const formattedRide = formatRideData(rides, parks);

    expect(formattedRide[0].park_id).toBe(0);
    expect(formattedRide[1].park_id).toBe(1);
  });
  test("that the objects in the returned array do not have a park_name key", () => {
    const rides = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Alton Towers",
        votes: 5,
      },
    ];
    const parks = [
      {
        park_id: 0,
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
    ];
    const formattedRide = formatRideData(rides, parks);
    expect(formattedRide[0].hasOwnProperty("park_name")).toBe(false);
  });
  test("that rides and parks input have not been mutated", () => {
    const rides = [
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Alton Towers",
        votes: 5,
      },
    ];
    const parks = [
      {
        park_id: 0,
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
    ];
    const formattedRide = formatRideData(rides, parks);
    expect(rides).toEqual([
      {
        ride_name: "Colossus",
        year_opened: 2002,
        park_name: "Alton Towers",
        votes: 5,
      },
    ]);
    expect(parks).toEqual([
      {
        park_id: 0,
        park_name: "Alton Towers",
        year_opened: 1980,
        annual_attendance: 2520000,
      },
    ]);
  });
});

