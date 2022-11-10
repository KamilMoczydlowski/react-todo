import { useState } from 'react';

import styles from './SearchBar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';

const SearchBar = props => {

	const [isInputActive, setIsInputActive] = useState(false);

	const showInputHandler = () => {
		setIsInputActive(true);
	};

	return (
		<div className={styles.searchBarBox}>
			<input className={styles.input} type='text' placeholder='Search tasks...' />
			<FontAwesomeIcon icon={fas('magnifying-glass')} />
		</div>
	);
};

export default SearchBar;
