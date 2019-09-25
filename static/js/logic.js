const map = L.map("map", {
    center: [40.4609396, -94.1694103],
    zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(map);

// let link = "us-115th-congress-members_v2.geojson";
let link = "Data/production_export.geojson";

function chooseColor(party) {
    switch (party) {
    case "Democratic":
        return "blue";
    default:
        return "red";
}}

d3.json(link).then(function(data) {
    //console.log(data);
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "white",
          // Call the chooseColor function to decide which color to color the party (color based on D or R)
          fillColor: chooseColor(feature.properties.party),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Set mouse events to change map styling
        layer.on({
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.8
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 40%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.4
            });
          },
          // When a district is clicked, it is enlarged to fit the screen
          click: function(event) {
            map.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h2>" + feature.properties.state_label + "</h2><h3>Representative: " + feature.properties.name + "</h3><h4>Gender: " + feature.properties.gender + "</h4><h4>District: " + feature.properties.district + "</h4><h4><a href='" + feature.properties.url + "' target='_blank'>See profile &#11016;</a></h4><h4><a href='https://twitter.com/" + feature.properties.twitter_account + "' target='_blank'><i style='font-size:24px' class='fa'>&#xf099;</i></a></h4>", {maxWidth: 500});  
      }
    }).addTo(map);
  }).catch(function(error) {
    console.log(error);
  });
