document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("dozema-coffee JS imported successfully!");
  },
  false
);

function startMap() {

  // Store Ironhack's coordinates
  const ironhackBCN = { lat: 41.3977381,  lng: 2.190471916 };

  // Initialize the map
  const map = new google.maps.Map(document.getElementById('map'), 
    {
      zoom: 5,
      center: ironhackBCN
    }
  );

  // Add a marker for Ironhack Barcelona
  const IronhackBCNMarker = new google.maps.Marker({
    position: {
      lat: ironhackBCN.lat,
      lng: ironhackBCN.lng
    },
    map: map,
    title: "Barcelona Campus"
  });


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      const ironhackBCNMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here."
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}

startMap();
