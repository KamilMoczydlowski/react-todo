import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBR4n4A4OZARr3zrZBxHx3WDqREGVNh5CA',
	authDomain: 'react-todo-1430c.firebaseapp.com',
	projectId: 'react-todo-1430c',
	storageBucket: 'react-todo-1430c.appspot.com',
	messagingSenderId: '419277316209',
	appId: '1:419277316209:web:000a929298d215318c7bd0',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
