import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: 'react-todo-1430c.firebaseapp.com',
	projectId: 'react-todo-1430c',
	storageBucket: 'react-todo-1430c.appspot.com',
	messagingSenderId: '419277316209',
	appId: '1:419277316209:web:000a929298d215318c7bd0',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
