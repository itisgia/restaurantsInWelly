
var map;
var storeArray = [];
var getMarkers;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionService = new google.maps.DirectionsService();
var railwayStation = new google.maps.LatLng(-41.2865,174.7762);

google.maps.event.addDomListener(window, 'load', initMap);

//initiating map centered in Wellington Railway Station
function initMap() {
    map = new google.maps.Map(document.getElementById('map') , {
        center: {
            lat : -41.304076,
            lng: 174.794288
        },
        zoom: 13
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    getLocation();
}


// get information of each resturants
function getLocation() {
  $.ajax({
      url: 'data/mark.json',
      type: 'GET',
      dataType: 'json',
      success: function(marker){
          for (var i = 0; i < marker.length; i++) {
            // console.log(marker);
              $('#listOfPlace').append("<div class='place' data-id='"+marker[i].id+"'><h3>"+marker[i].title+"</h3></div><hr>")
               getMarkers = new google.maps.Marker({
                  position: {
                      lat: marker[i].lat,
                      lng: marker[i].lng
                  },
                  map: map,
                  title: marker[i].title,
                  markerID: marker[i].id
                });
              storeArray.push(getMarkers); // storing in an array so that use as a referance
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
$(document).on('click', '.place', function(){
  var id = $(this).data('id');
  for (var i = 0; i < storeArray.length; i++) {
      if (storeArray[i].markerID === id) {
        console.log(storeArray[i]);
        // map.panTo(storeArray[i].position);
        // map.setZoom(17);
        // console.log(id);
        // break;
        var request = {
          origin: railwayStation,
          destination: storeArray[i].position,
          travelMode : "DRIVING"
        }
      }
  }
  directionService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
  showDiv ();
});

function showDiv () {
  $('#btn')["0"].style.display = 'block';
  $('#directionsPanel')["0"].style.display = 'block';
  walking();
}

document.getElementById("walk").addEventListener("click", walking);
function walking() {
  console.log('clicked');
}

// function
// get direction from yoobe school
