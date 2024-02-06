/* 
Add an event listener that runs
  when a user clicks on the map element.
*/
map.on("click", (event) => {
  /*What should happen when something is clicked*/

  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["public-parks-4gj0ay"] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>Location: ${feature.properties.sitename}</h3>
    <p>Use: ${feature.properties.taxipublicuses}</p>
    <p>Number of charging points: ${feature.properties.numberrcpoints}</p>`
    )
    .addTo(map);
});

map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["public-parks-4gj0ay"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZName}</h3><p>Rank: <strong>${dzone[0].properties.Percentv2}</strong> %</p>`
    : `<p>Hover over a data zone!</p>`;
});