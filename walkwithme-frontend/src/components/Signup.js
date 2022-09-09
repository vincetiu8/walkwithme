import React, {useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"

export default function Signup() {
	const firstnameRef = useRef()
	const lastnameRef = useRef()
	const usernameRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const fileRef = useRef()
	const {signup, updateUserName, updateUserImage} = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match")
		}

		if (passwordRef.current.value.length < 7){
			return setError("Password must be longer than 6 characters.")
		}

		try {
			setError("")
			setLoading(true)
			await signup(usernameRef.current.value, passwordRef.current.value, firstnameRef.current.value + " " + lastnameRef.current.value, fileRef.current.files[0])
			history.push("/")
		} catch (e) {
			console.log(e)
			setError("Failed to create an account")
		}

		setLoading(false)
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Group id="firstname">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" ref={firstnameRef} required/>
						</Form.Group>
						<Form.Group id="lastname">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" ref={lastnameRef} required/>
						</Form.Group>
						<Form.Group id="username">
							<Form.Label>Username</Form.Label>
							<Form.Control type="username" ref={usernameRef} required/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required/>
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required/>
						</Form.Group>
						<Form.Group id="profile-picture">
							<Form.Label>Profile Picture</Form.Label>
							<Form.Control type="file" ref={fileRef} required/>
						</Form.Group>
						{error && <Alert variant="danger">{error}</Alert>}
						<Button disabled={loading} className="w-100" type="submit">
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/login">Log In</Link>
			</div>
		</>
	)
}
