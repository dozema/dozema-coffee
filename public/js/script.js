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
    const SPOT_CREATE = "spots/create";
    const IS_SPOT_DETAILS_VIEW =
      window.location.pathname.includes(SPOT_DETAILS);
    const IS_ROOT_VIEW = window.location.pathname === "/";
    const IS_SPOT_CREATE_VIEW = window.location.pathname.includes(SPOT_CREATE);

    if (IS_SPOT_CREATE_VIEW) {
      // Initialize the map
      const map = new google.maps.Map(MAP_ELEMENT, {
        zoom: 3,
        center: { lat: 53.0, lng: 9.0 },
      });

      // Create the search box and link it to the UI element.
      const input = document.getElementById("pac-input");
      const searchBox = new google.maps.places.SearchBox(input);

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      let markers = [];

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log("places", places);
        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };

          // Create a marker for each place.
          markers.push(
            new google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }

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
