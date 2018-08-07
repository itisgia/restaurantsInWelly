
var map;
var storeArray = [];
var getMarkers;

google.maps.event.addDomListener(window, 'load', initMap);

function initMap() {
    map = new google.maps.Map(document.getElementById('map') , {
        center: {
            lat : -41.304076,
            lng: 174.794288
        },
        zoom: 13.8
    });
    getLocation();
}



function getLocation() {
  $.ajax({
      url: 'data/mark.json',
      type: 'GET',
      dataType: 'json',
      success: function(marker){
          for (var i = 0; i < marker.length; i++) {
            console.log(marker);
              $('#listOfPlace').append("<div class='place' data-id='"+marker[i].id+"' onclick= 'goToPlace()'><h3>"+marker[i].title+"</h3></div><hr>")
               getMarkers = new google.maps.Marker({
                  position: {
                      lat: marker[i].lat,
                      lng: marker[i].lng
                  },
                  map: map,
                  title: marker[i].title
                });
              storeArray.push(marker);
              // goToPlace();
          }
      },
      error: function (fail) {
          console.log(fail);
          console.log("SOMETHING WENT WRONG");
      }

  })
}

console.log(storeArray);


function goToPlace(e) {
  console.log('clicked');
  for (var i = 0; i < storeArray.length; i++) {
      if (storeArray[i].id === e.t ) {
        // map.panTo(storeArray[i].position);
      }
  }

}
