import { useState } from 'react';

import styles from './SearchBar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';

const SearchBar = props => {
	const [isInputActive, setIsInputActive] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const showInputHandler = () => {
		if (!isInputActive) {
			setIsInputActive(true);
		} else {
			setIsInputActive(false);
			setInputValue('');
		}
	};

	const inputValueHandler = event => {
		setInputValue(event.target.value);
	};

	return (
			<div className={styles.searchBarBox}>
				<input
					type='text'
					placeholder='Search tasks...'
					className={
						isInputActive
							? `${styles.input} ${styles.inputActive}`
							: styles.input
					}
					value={inputValue}
					onChange={inputValueHandler}
				/>
				<div className={styles.iconBox}>
					<FontAwesomeIcon
						icon={fas('magnifying-glass')}
						className={isInputActive
							? `${styles.icon} ${styles.iconActive}`
							: styles.icon}
						onClick={showInputHandler}
					/>
				</div>
			</div>
	);
};

export default SearchBar;
