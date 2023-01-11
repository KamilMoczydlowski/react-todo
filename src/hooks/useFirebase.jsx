import { useState, useEffect } from 'react';

import { collection, query, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase';

export const useFirebase = (key, setFn) => {

	useEffect(() => {
		const q = query(collection(db, key));

		const unsub = onSnapshot(q, querySnapshot => {
			let arr = [];
			querySnapshot.forEach(doc => {
				arr.push({ ...doc.data(), id: doc.id });
			});
			setFn(arr);
		});
		return () => unsub();
	}, [key, setFn]);

	// useEffect(() => {
	// 	localStorage.setItem(key, JSON.stringify(value));
	// }, [value, key]);
};
