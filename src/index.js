import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Firebase stuff
import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";

// React Setup

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAWPAeHprKUNW-me7A2DgZ5sgq4yASejdo",
	authDomain: "walkwithme-25e22.firebaseapp.com",
	projectId: "walkwithme-25e22",
	storageBucket: "walkwithme-25e22.appspot.com",
	messagingSenderId: "283723925593",
	appId: "1:283723925593:web:8aebc9a3df0ecacbb0c948"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
onAuthStateChanged(auth, user => {
	// Check for user status
});
