import React, {useState} from "react"
import {Alert, Button, Card} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"

export default function Dashboard() {
	const [error, setError] = useState("")
	const {currentUser, logout} = useAuth()
	const history = useHistory()

	async function handleLogout() {
		setError("")
		try {
			await logout()
			history.push("/login")
		} catch {
			setError("Failed to log out")
		}
	}

	console.log(currentUser.photoURL)

	return (
		<>
			<Card>
				<Card.Body>
					<div className="container">
						<div className="row">
							<div className="col">
								<h2 className="text-center mb-4">Profile</h2>
								{error && <Alert variant="danger">{error}</Alert>}
							</div>
						</div>
						<div className="row">
							<div className="col text-center mb-2">
								<img alt="profile" src={currentUser.photoURL} className="img-thumbnail" style={{"width": "200px", "height": "200px", "objectFit": "cover"}}/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<strong>Name:</strong> {currentUser.displayName}
							</div>
						</div>
						<div className="row">
							<div className="col">
								<strong>Email:</strong> {currentUser.email}
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
									Update Profile
								</Link>
							</div>
						</div>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</>
	)
}
