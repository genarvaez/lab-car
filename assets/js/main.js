

function initMap(){
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom:12,
		center: {lat: -33.4488897, lng: -70.6692655},
		mapTypeControl: false,
		zoomControl: true,
		streetViewControl: false,
	});
	
	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError)
		}
	}
	window.addEventListener("load", buscar);
	//document.getElementById("found").addEventListener("click", buscar);
	var longitud, latitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

	var miUbicacion = new google.maps.Marker({
		position: {lat: latitud, lng: longitud},
		animation: google.maps.Animation.DROP, 
		map: map,
	});

	map.setZoom(17);
	map.setCenter({lat: latitud, lng:longitud})
	}
	var funcionError = function(error){
		alert("Tenemos problemas para encontrar tu ubicacion")
	}
	//literalmente copie y pegué del ejercicio anterior, pero no funcionó el autocompletado
	var inputDesde = document.getElementById('inicio');
	var inputHasta = document.getElementById('fin');
	var autocomplete = new google.maps.places.Autocomplete(inputDesde);
	var autocomplete = new google.maps.places.Autocomplete(inputHasta);

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;




	


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