document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("dozema-coffee JS imported successfully!");
  },
  false
);

window.addEventListener("load", () => {
  console.log(spotLocation.coordinates);

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
  title: `${spotLocation}`
});
});



// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function (position) {
//     const user_location = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };

//     // Center map with user location
//     map.setCenter(user_location);

//     // Add a marker for your user location
//     const ironhackBCNMarker = new google.maps.Marker({
//       position: {
//         lat: user_location.lat,
//         lng: user_location.lng
//       },
//       map: map,
//       title: "You are here."
//     });

//   }, function () {
//     console.log('Error in the geolocation service.');
//   });
// } else {
//   console.log('Browser does not support geolocation.');
// }
//}
