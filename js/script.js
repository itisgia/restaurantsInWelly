
var map;
var storeArray = [];

google.maps.event.addDomListener(window, 'load', initMap);

function initMap() {
    map = new google.maps.Map(document.getElementById('map') , {
      center: {
          lat : -41.304076,
          lng: 174.794288
      },
      zoom: 13.8
    });
    getLocation()
}



function getLocation() {
  $.ajax({
      url: 'data/mark.json',
      type: 'GET',
      dataType: 'json',
      success: function(marker){
          console.log(marker);
          for (var i = 0; i < marker.length; i++) {
              $('#listOfPlace').append("<div class='place'><h3>"+marker[i].title+"</h3></div><hr>")
            var getMarkers = new google.maps.Marker({
                position: {
                  lat: marker[i].lat,
                  lng: marker[i].lng
                },
                map: map,
                title: marker[i].title
              });
          }
      },
      error: function (fail) {
          console.log(fail);
          console.log("SOMETHING WENT WRONG");
      }

  })
}
