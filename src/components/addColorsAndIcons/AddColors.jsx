import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const AddColors = () => {
	const [color, setColor] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		if (color !== '') {
			await addDoc(collection(db, 'colors'), {
				color: '#' + color,
			});
			setColor('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='colorInput'>color #</label>
				<input
					id='colorInput'
					type='text'
					value={color}
					onChange={e => setColor(e.target.value)}
				/>
			</div>
			<div>
				<button>Add</button>
			</div>
		</form>
	);
};
