import React, {useContext, useEffect, useState} from "react"
import {baseUrl, storage} from "../firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import axios from "axios";

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({children}) {
	const [currentUser, setCurrentUser] = useState(null)

	function signup(username, password, name, photo) {
		const imageRef = ref(storage, `images/${username}`)

		return uploadBytes(imageRef, photo).then(() => {
			getDownloadURL(imageRef).then((url) => {
				axios.post(`http://${baseUrl}/accounts/create`, {
					username: username,
					password: password,
					name: name,
					photo_url: url
				}).then((response) => {
					console.log(response.data)
					setCurrentUser(response.data)
				})
			})
		})
	}

	function login(username, password) {
		return axios.post(`http://${baseUrl}/accounts/login`, {
			username: username,
			password: password
		}).then((response) => {
			setCurrentUser(response.data)
		})
	}

	function updateUserName(displayName) {
		return axios.put(`http://${baseUrl}/accounts/username`, {
			username: currentUser.username,
			new_username: displayName
		}).then((response) => {
			setCurrentUser({
				...currentUser,
				username: displayName
			})
		})
	}

	function updateUserPassword(password) {
		return axios.put(`http://${baseUrl}/accounts/password`, {
			username: currentUser.username,
			new_password: password
		}).then((response) => {
			setCurrentUser({
				...currentUser,
				password: password
			})
		})
	}

	function updateName(name) {
		return axios.put(`http://${baseUrl}/accounts/name`, {
			username: currentUser.username,
			new_name: name
		}).then((response) => {
			setCurrentUser({
				...currentUser,
				name: name
			})
		})
	}

	function logout() {
		return setCurrentUser(null)
	}

	const value = {
		currentUser,
		login,
		signup,
		updateUserName,
		updateUserPassword,
		updateName,
		logout
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}
