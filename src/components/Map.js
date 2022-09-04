function initMap() {
	var directionsService = new window.google.maps.DirectionsService();
	var directionsRenderer = new window.google.maps.DirectionsRenderer();
	var map = new window.google.maps.Map(document.getElementById("map"), {
		zoom: 6,
		center: {lat: 41.85, lng: -87.65},
	});
	directionsRenderer.setMap(map);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, start, end, wps) {
	var waypts = [];
	waypts.push({
		location: (wps[0]).value,
		stopover: true,
	});
	waypts.push({
		location: (wps[1]).value,
		stopover: true,
	});
	directionsService
		.route({
			origin: start,
			destination: end,
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
			return "L";
		});
}

export{initMap, calculateAndDisplayRoute}