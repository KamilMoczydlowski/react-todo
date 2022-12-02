import { useRef, useContext, useState } from 'react';

import DataContext from '../../../store/data-context';

import styles from './EditItemPopup.module.css';
import ModalBlueprint from './ModalBlueprint';

const removeWhiteSpaces = sentence => {
	let arr = sentence.split(' ').filter(string => string !== '');
	let newSentence = arr.join(' ');
	return newSentence;
};

const EditItemPopup = props => {
	const [error, setError] = useState('');

	const inputRef = useRef();

	const dataCtx = useContext(DataContext);
	const editTask = dataCtx.editTask;

	const abortEditing = () => {
		props.showPopup(false);
		props.setClickedTask({});
		setError('');
	};

	const accetpEditing = () => {
		const trimmedInput = removeWhiteSpaces(inputRef.current.value);

		if (props.clickedTask.id === trimmedInput) {
			setError("I don't see any change...");
		} else if (trimmedInput === '') {
			setError('Please, type something.');
		} else {
			editTask(props.clickedTask.id, { text: inputRef.current.value });
			props.showPopup(false);
			props.setClickedTask({});
			setError('');
		}
	};

	return (
		<ModalBlueprint text='Edit your task.'>
			<input
				ref={inputRef}
				type='text'
				className={
					!error ? styles.input : `${styles.input} ${styles.inputError}`
				}
				placeholder={props.clickedTask.text}
			/>
			<div className={styles.errorBox}>
				<p className={styles.errorMsg}>{error}</p>
			</div>
			<div className={styles.btnsBox}>
				<button
					type='submit'
					className={`${styles.btn} ${styles.btnAccept}`}
					onClick={accetpEditing}>
					Accept
				</button>
				<button className={styles.btn} onClick={abortEditing}>
					Cancel
				</button>
			</div>
		</ModalBlueprint>
	);
};

export default EditItemPopup;
