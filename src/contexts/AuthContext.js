import React, {useContext, useEffect, useState} from "react"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword
} from "firebase/auth"
import {auth, storage} from "../firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({children}) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function logout() {
		return signOut(auth)
	}

	function resetPassword(email) {
		return sendPasswordResetEmail(auth, email)
	}

	function updateUserImage(photo) {
		const imageRef = ref(storage, `images/${auth.currentUser.uid}`)

		return uploadBytes(imageRef, photo).then(() => {
			getDownloadURL(imageRef).then((url) => {
				updateProfile(auth.currentUser, {photoURL: url})
			})
		})
	}

	function updateUserName(displayName) {
		return updateProfile(auth.currentUser, {
			displayName: displayName
		})
	}

	function updateUserEmail(email) {
		return updateEmail(auth.currentUser, email)
	}

	function updateUserPassword(password) {
		return updatePassword(auth.currentUser, password)
	}

	useEffect(() => {
		return auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})
	}, [])

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateUserImage,
		updateUserName,
		updateUserEmail,
		updateUserPassword
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
