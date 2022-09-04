import React, {useState} from "react"
import {Alert, Button, Card, Form} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"
import Header from "./Header"

export default function Dashboard() {
	const [error, setError] = useState("")
	const {currentUser, logout} = useAuth()
	const history = useHistory()

	const directionsService = new window.google.maps.DirectionsService()
	directionsService.route()

	async function handleLogout() {
		setError("")
		try {
			await logout()
			history.push("/login")
		} catch {
			setError("Failed to log out")
		}
	}

	return (
		<div className="mainpage">
			<Header />
			{/* Have MULTIPLE cards over here */}
			<Card>
				<Card.Img variant="top" src="" />
				<Card.Body>
					<Card.Title>Trip With John Smith</Card.Title>
					<Card.Text>On Dec 7 1969 at 4:20pm</Card.Text>
				</Card.Body>
			</Card>

			<Card>
				<Card.Img variant="top" src="" />
				<Card.Body>
					<Card.Title>Trip With John Smith</Card.Title>
					<Card.Text>On Dec 7 1969 at 4:20pm</Card.Text>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</div>
	)
}
