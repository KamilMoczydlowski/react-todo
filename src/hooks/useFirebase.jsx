import { useState } from "react";

import { collection, query, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase';

export const useFirebase = (key, initialValue) => {

	const [value, setValue] = useState(() => {

        const q = query(collection(db, key));

		const unsub = onSnapshot(q, querySnapshot => {
			let arr = [];
			querySnapshot.forEach(doc => {
				arr.push({ ...doc.data(), id: doc.id });
			});
            return arr
		});

		const fetchedValue = () => unsub();

		if (fetchedValue == null) {
			if (typeof initialValue === 'function') {
				return initialValue();
			} else {
				return initialValue;
			}
		} else {
			return fetchedValue
		}
	});

	// useEffect(() => {
	// 	localStorage.setItem(key, JSON.stringify(value));
	// }, [value, key]);

	return [value, setValue];
};