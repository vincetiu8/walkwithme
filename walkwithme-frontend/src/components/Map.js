/*global google*/
import React, {Component, useRef} from "react";
import {
	withGoogleMap,
	withScriptjs,
	GoogleMap,
	DirectionsRenderer
} from "react-google-maps";
import {Form} from "react-bootstrap";
import axios from "axios";
import {baseUrl} from "../firebase";
import {useAuth} from "../contexts/AuthContext";
import Header from "./Header";
import {TextField} from "@mui/material";

function Map() {
	const [directions, setDirections] = React.useState(null);
	const startLat = useRef()
	const endLat = useRef()
	const {currentUser} = useAuth()
	const [otherUser, setOtherUser] = React.useState(null)

	const directionsService = new google.maps.DirectionsService();

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const onCoordinateSubmit = async (event) => {
		event.preventDefault()

		setOtherUser(null)
		const origin = startLat.current.value
		const destination = endLat.current.value

		let result = await directionsService.route(
			{
				origin: origin,
				destination: destination,
				travelMode: google.maps.TravelMode.WALKING
			})
		if (result) {
			setDirections(result)
		} else {
			console.error(`error fetching directions ${result}`);
		}

		let orig = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${origin}&key=AIzaSyBbp2hrU3Jw2fXd9zHGsz8CaFozb7XKgV0`)
		let dest = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=AIzaSyBbp2hrU3Jw2fXd9zHGsz8CaFozb7XKgV0`)
		let res = await axios.post(`http://${baseUrl}/search/registerplan`, {
			username: currentUser.username,
			path: {
				start_location: orig.data.results[0].geometry.location,
				end_location: dest.data.results[0].geometry.location
			}
		})

		console.log(res)
		let searching = true
		let medianPoints = null
		while (searching) {
			try {
				res = await axios.post(`http://${baseUrl}/search/findpartner`, {
					username: currentUser.username
				})
				console.log(res)
				if (res.status === 200) {
					searching = false
					medianPoints = res.data.path
					setOtherUser(res.data.user1 === currentUser.username ? res.data.user2 : res.data.user1)

					break
				}
			} catch {

			}

			await sleep(5000)
		}

		// let orig2 = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${medianPoints.start_location.lat + "," + medianPoints.start_location.lng}&key=AIzaSyBbp2hrU3Jw2fXd9zHGsz8CaFozb7XKgV0`)
		// let dest2 = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${medianPoints.end_location.lat + "," + medianPoints.end_location.lng}&key=AIzaSyBbp2hrU3Jw2fXd9zHGsz8CaFozb7XKgV0`)

		const wpts = [{location: medianPoints.start_location.lat + "," + medianPoints.start_location.lng, stopover: true}, {location: medianPoints.end_location.lat + "," + medianPoints.end_location.lng, stopover: true}]
		console.log(wpts)

		let new_result = await directionsService.route(
			{
				origin: origin,
				destination: destination,
				waypoints: wpts,
				travelMode: google.maps.TravelMode.WALKING
			})
		if (new_result) {
			setDirections(new_result)
		} else {
			console.error(`error fetching directions ${new_result}`);
		}
	}

	const GoogleMapExample = withGoogleMap(props => (
		<GoogleMap
			defaultCenter={{lat: 40.756795, lng: -73.954298}}
			defaultZoom={13}
		>
			{directions && <DirectionsRenderer directions={directions}/>}
		</GoogleMap>
	));

	return (
		<div>
			{
				otherUser ? <h1>You're walking with {otherUser}!</h1> : ""
			}
			<GoogleMapExample
				containerElement={<div style={{height: `500px`, width: "500px"}}/>}
				mapElement={<div style={{height: `100%`}}/>}
			/>
			<Form onSubmit={onCoordinateSubmit}>
				<Form.Group controlId="formOriginLocation">
					<Form.Label>Origin Location</Form.Label>
					<Form.Control type="text" placeholder="Enter Starting Point" ref={startLat}/>
				</Form.Group>
				<Form.Group controlId="formEndingLocation">
					<Form.Label>Ending Location</Form.Label>
					<Form.Control type="text" placeholder="Enter Ending Point" ref={endLat}/>
				</Form.Group>

				<Form.Group controlId="formSubmit">
					<Form.Label>Submit</Form.Label>
					<Form.Control type="submit"/>
				</Form.Group>
			</Form>
		</div>
	);
}

export default Map;
