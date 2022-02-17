document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("dozema-coffee JS imported successfully!");
  },
  false
);

// Map for spot-Details
window.addEventListener("load", async () => {
  const MAP_ELEMENT = document.getElementById("map");
  const VIEW_HAS_MAP_ELEMENT = MAP_ELEMENT;
  console.log("this is goodle");

  new google.maps.Geocoder().geocode(
    {
      address: "dublin",
    },
    function (results) {
      console.log(results);
      // console.log(results[0].geometry.location); //LatLng
    }
  );
  if (VIEW_HAS_MAP_ELEMENT) {
    // Fetch locations of spots
    const locations = await window.fetch("/spots/locations");
    const results = await locations.json();

    const SPOT_DETAILS = "spot-details";
    const IS_SPOT_DETAILS_VIEW =
      window.location.pathname.includes(SPOT_DETAILS);
    const IS_ROOT_VIEW = window.location.pathname === "/";

    if (IS_ROOT_VIEW) {
      // Initialize the map
      const map = new google.maps.Map(MAP_ELEMENT, {
        zoom: 3,
        center: { lat: 53.0, lng: 9.0 },
      });
      // Set markers for each location
      results.locations.forEach(
        (location) =>
          new google.maps.Marker({
            position: {
              lat: location.latitude,
              lng: location.longitude,
            },
            map: map,
          })
      );
    }

    if (IS_SPOT_DETAILS_VIEW) {
      const spotId = window.location.pathname.split("/")[2];
      const spotLocation = results.locations.find(
        (location) => location.id === spotId
      );

      // Initialize the map
      const map = new google.maps.Map(MAP_ELEMENT, {
        zoom: 10,
        center: { lat: spotLocation.latitude, lng: spotLocation.longitude },
      });

      new google.maps.Marker({
        position: {
          lat: spotLocation.latitude,
          lng: spotLocation.longitude,
        },
        map: map,
      });
    }

    // Set markers for each location
    // results.locations.forEach(
    //   (location) =>
    //     new google.maps.Marker({
    //       position: {
    //         lat: location.latitude,
    //         lng: location.longitude,
    //       },
    //       map: map,
    //     })
    // );
  }
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
