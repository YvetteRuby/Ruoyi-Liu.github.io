// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoibWljaGVsZTIwMTYyMSIsImEiOiJjbHI2ZWJ0NXAwMXZxMmlueGF5MXZib2NyIn0.T0ZSN3EIA-6ANrw6GKsTzQ";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/michele201621/clsz1w6mr00fa01poer813zyb"
});
//Add hover interaction
map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["Glasgow-Greenspace"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h3>Greenspace ID:${dzone[0].properties.id}</h3><p>Green space types: <strong>${dzone[0].properties.function}</strong></p>`
    : `<p>Hover to find green spaces</p>`;
  map.getSource("hover").setData({
    type: "FeatureCollection",
    features: dzone.map(function (f) {
      return { type: "Feature", geometry: f.geometry };
    })
  });
});

map.on("load", () => {
  const layers = [
    "Play Space",
    "Religious Grounds",
    "Playing Field",
    "Other Sports Facility",
    "Public Park Or Garden",
    "Allotments Or Community Growing Spaces",
    "Bowling Green",
    "Tennis Court",
    "Golf Course",
    "Cemetery"
  ];
  const colors = [
    "#ccffcc",
    "#b5eeb5",
    "#9fdd9f",
    "#88cb88",
    "#71ba71",
    "#5ba95b",
    "#449844",
    "#2d862d",
    "#177517",
    "#006400"
  ];

  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const key = document.createElement("div");
    //place holder
    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;

    legend.appendChild(key);
    if (i >= 8) {
      key.style.color = "white";
    }
  });

  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });

  map.addLayer({
    id: "dz-hover",
    type: "line",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "purple",
      "line-width": 4
    }
  });

  const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    placeholder: "Search for places in Glasgow", // Placeholder text for the search bar
    proximity: {
      longitude: -4.2518,
      latitude: 55.8642
    } // Coordinates of Glasgow center
  });
  map.addControl(geocoder, "top-left");

  map.addControl(new mapboxgl.NavigationControl(), "top-left");

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }),
    "top-left"
  );
});