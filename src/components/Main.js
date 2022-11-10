import { useState } from 'react';

import styles from './Main.module.css';

import Wrapper from './Wrapper';

import UserGreeting from './UserGreeting';
import CategoryTile from './CategoryTile';

let user = 'User';
let taskCount = 0;
let categoriesTiles = [];

const Main = props => {
	const [activeIcon, setActiveIcon] = useState('tilesButton'); // 'tilesButton' or 'squareButton'
    // const [searchInputValue, setSearchInputValue] = useState('')

	const activateIconHandler = e => {
		const buttonId = e.target.closest('button').id;

		if (activeIcon !== buttonId) {
			setActiveIcon(buttonId);
		}
	};

	return (
		<Wrapper>
			<UserGreeting
				user={user}
				taskCount={taskCount}
				activeIcon={activeIcon}
				activateIconHandler={activateIconHandler}
			/>
			<div>{categoriesTiles}</div>
		</Wrapper>
	);
};

export default Main;
