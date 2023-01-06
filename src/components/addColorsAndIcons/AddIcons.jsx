import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const AddIcons = () => {
	const [icon, setIcon] = useState('');
	const [iconTitle, setIconTitle] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		if (icon !== '' && iconTitle !== '') {
			await addDoc(collection(db, 'icons'), {
				icon,
				title: iconTitle,
			});
			setIcon('');
			setIconTitle('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='iconInput'>icon (emoji)</label>
				<input
					id='iconInput'
					type='text'
					value={icon}
					onChange={e => setIcon(e.target.value)}
				/>
				<label htmlFor='iconTitleInput'>icon title</label>
				<input
					id='iconTitleInput'
					type='text'
					value={iconTitle}
					onChange={e => setIconTitle(e.target.value)}
				/>
			</div>
			<div>
				<button>Add</button>
			</div>
		</form>
	);
};
