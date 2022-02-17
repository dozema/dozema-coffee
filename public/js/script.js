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
// function startMap() {
//   const defaultLocation = { lat: 41.3977381, lng: 2.190471916 };

//   // Initialize the map
//   const map = new google.maps.Map(document.getElementById("mapBlanco"), {
//     zoom: 15,
//     center: defaultLocation,
//   });

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         const userLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };

//         // Center map with user location
//         map.setCenter(userLocation);

//         // Add a marker for your user location
//         const marker = new google.maps.Marker({
//           position: {
//             lat: userLocation.lat,
//             lng: userLocation.lng,
//           },
//           map: map,
//           title: "You are here.",
//         });
//       },
//       function () {
//         console.log("Error in the geolocation service.");
//       }
//     );
//   } else {
//     console.log("Browser does not support geolocation.");
//   }



// google.maps.event.addListener(map, "click", (event) => {
//   addMarker(event.latLng, map);
// });
// }
// // Adds a marker to the map.
// function addMarker(location, map) {
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   new google.maps.Marker({
//     position: location,
//     label: labels[labelIndex++ % labels.length],
//     map: map,
//   });

//   // Configure the click listener.
//   map.addListener("click", (mapsMouseEvent) => {
//     marker = new google.maps.Marker({
//       position: mapsMouseEvent.latLng,
//     });
//     console.log(mapsMouseEvent.latLng)
//  }

// startMap();
