function initMap() {
	var directionsService = new window.google.maps.DirectionsService();
	var directionsRenderer = new window.google.maps.DirectionsRenderer();
	var map = new window.google.maps.Map(document.getElementById("map"), {
		zoom: 6,
		center: {lat: 41.85, lng: -87.65},
	});
	directionsRenderer.setMap(map);
	document.getElementById("submit").addEventListener("click", function () {
		calculateAndDisplayRoute(directionsService, directionsRenderer);
	});
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
	var waypts = [];
	var wp1 = document.getElementById("wp1");
	waypts.push({
		location: (wp1).value,
		stopover: true,
	});
	var wp2 = document.getElementById("wp2");
	waypts.push({
		location: (wp2).value,
		stopover: true,
	});
	directionsService
		.route({
			origin: document.getElementById("start").value,
			destination: document.getElementById("end").value,
			waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: window.google.maps.TravelMode.DRIVING,
		})
		.then(function (response) {
			directionsRenderer.setDirections(response);
			var route = response.routes[0];
			var summaryPanel = document.getElementById("directions-panel");
			summaryPanel.innerHTML = "";
			// For each route, display summary information.
			for (var i = 0; i < route.legs.length; i++) {
				var routeSegment = i + 1;
				summaryPanel.innerHTML +=
					"<b>Route Segment: " + routeSegment + "</b><br>";
				summaryPanel.innerHTML += route.legs[i].start_address + " to ";
				summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
				summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
			}
		})
		.catch(function (e) {
			return window.alert("Directions request failed due to " + status);
		});
}

window.initMap = initMap;
