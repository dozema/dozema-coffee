document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("dozema-coffee JS imported successfully!");
  },
  false
);

// Map for spot-Details
window.addEventListener("load", () => {
  const location = {
    lat: spotLocation.coordinates[1],
    lng: spotLocation.coordinates[0],
  };
  // Initialize the map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: location,
  });

  // Add a marker for Spot
  const marker = new google.maps.Marker({
    position: {
      lat: spotLocation.coordinates[1],
      lng: spotLocation.coordinates[0],
    },
    map: map,
    title: `${spotLocation}`,
  });
});

// Map for create spot
function startMap() {
  const defaultLocation = { lat: 41.3977381, lng: 2.190471916 };

  // Initialize the map
  const map = new google.maps.Map(document.getElementById("mapBlanco"), {
    zoom: 15,
    center: defaultLocation,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Center map with user location
        map.setCenter(user_location);

        // Add a marker for your user location
        const userMarker = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng,
          },
          map: map,
          title: "You are here.",
        });
      },
      function () {
        console.log("Error in the geolocation service.");
      }
    );
  } else {
    console.log("Browser does not support geolocation.");
  }
}

startMap();
