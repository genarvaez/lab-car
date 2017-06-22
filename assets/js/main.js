var inputDesde = document.getElementById('inicio');
var inputHasta = document.getElementById('fin');

function initMap(){
	 var geocoder = new google.maps.Geocoder();
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom:12,
		center: {lat: -33.4488897, lng: -70.6692655},
		mapTypeControl: false,
		zoomControl: true,
		streetViewControl: false,
	});
	

	 var source = document.getElementById("inicio").value;
     var destination = document.getElementById("fin").value;

 

	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError)
		}
	}
	window.addEventListener("load", buscar);
	var longitud, latitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

	var miUbicacion = new google.maps.Marker({
		position: {lat: latitud, lng: longitud},
		animation: google.maps.Animation.DROP, 
		map: map,
		draggable: true
	});

	map.setZoom(17);
	map.setCenter({lat: latitud, lng:longitud})
	}
	var funcionError = function(error){
		alert("Tenemos problemas para encontrar tu ubicacion")
	}
	
	
	var autocomplete = new google.maps.places.Autocomplete(inputDesde);
	var autocomplete = new google.maps.places.Autocomplete(inputHasta);

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;


/* INTENDO DE CALCULO DE DISTANCIA
	function calculateDistance()
    {
      
            var glatlng1 = new GLatLng(location1.lat, location1.lon);
            var glatlng2 = new GLatLng(location2.lat, location2.lon);
            var miledistance = glatlng1.distanceFrom(glatlng2, 3959).toFixed(1);
            var kmdistance = (miledistance * 1.609344).toFixed(1);
            alert('Address 1: ' + location1.address + ' (' + location1.lat + ':' + 
            	location1.lon + ')<br />Address 2: ' + location2.address + ' (' + location2.lat + ':' 
            	+ location2.lon + ')<br />Distance: ' + miledistance + ' miles (or ' + kmdistance 
            	+ ' kilometers)<br/>');
         }



    geocoder.getLocations(document.forms[0].inputDesde.value, function (response) {
        if (!response || response.Status.code != 200) {
            alert("Sorry, your start addess is required");
        } 
        else{
	        location1 = {lat: response.Placemark[0].Point.coordinates[1], lon: response.Placemark[0].Point.coordinates[0], address: response.Placemark[0].address};
            geocoder.getLocations(document.forms[0].inputHasta.value, function (response) {
            if (!response || response.Status.code != 200) {
                alert("Sorry, your end address is required");
            } 
            else{
	            location2 = {lat: response.Placemark[0].Point.coordinates[1], lon: response.Placemark[0].Point.coordinates[0], address: response.Placemark[0].address};
                calculateDistance();
            }
                });
            }
        });
   
*/ 


      function calcularRuta(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('inicio').value,
          destination: document.getElementById('fin').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);

          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

	 directionsDisplay.setMap(map);

	 var trazar = function(){
	 	calcularRuta(directionsService, directionsDisplay)
	 };
	 document.getElementById("found").addEventListener("click", trazar);
    
        
}


//MANIPULANDO CAMBIOS EN RESPONSIVE
window.addEventListener("resize", cambiarTexto);

function cambiarTexto() {    
    var width = document.documentElement.clientWidth;
    
    if (width < 900 && width > 450){
      document.getElementById("title-h3").innerHTML = "Viajar con " + '<img src="assets/img/logo-blanco.png" alt="">';
      document.querySelector(".box-register p").style.display = "none";
      document.querySelector(".box-register h2").style.display = "none";
      document.querySelector(".download-info h1").style.display ="none";
      document.querySelector(".download-info p").style.display ="none";
    }else if(width < 450){
      document.getElementById("title-h3").innerHTML = "Viajar con " + '<img src="assets/img/logo-blanco.png" alt="">';
      document.querySelector(".box-register p").style.display = "none";
      document.querySelector(".box-register h2").style.display = "none";
      document.querySelector(".download-info h1").style.display ="none";
      document.querySelector(".download-info p").style.display ="none";
    }
    else{
    	document.querySelector(".box-register p").style.display = "block";
    	document.querySelector(".box-register h2").style.display = "block";
    	document.querySelector(".download-info h1").style.display ="block";
      	document.querySelector(".download-info p").style.display ="block";
    	
    }
}