var service;
function findPlaceInfo(placeName){
    console.log(placeName);
    var request = {
        query: placeName +' Wellington New Zealand',
        fields: ['id', 'name', 'photos', 'formatted_address', 'rating', 'opening_hours']
    };
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, getPlaces);
}


function getPlaces(results, status) {
    console.log(status);
    console.log(results);
    if (status == "OK") {
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
          var photos = results[i].photos
          console.log(photos[0].getUrl({
              'maxWidth': 300,
              'maxHeight': 300
          })); // get the url of photos
        }
    } else {
        console.log("WRONG");
    }
}
