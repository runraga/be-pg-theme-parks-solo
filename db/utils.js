function formatRideData(rides, parks) {
  const formattedRideData = rides.map((ride) => {
    const parkId = parks.find((park) => park.park_name === ride.park_name);
    
    const id = parkId.park_id;
    const newRideData = { ...ride };
    newRideData.park_id = id;
    delete newRideData.park_name;
    return newRideData;
  });
  return formattedRideData;
}

module.exports = formatRideData;
