import { Fragment, useState } from 'react';

import styles from './Main.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';

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
		<Fragment>
			<UserGreeting
				user={user}
				taskCount={taskCount}
				activeIcon={activeIcon}
				activateIconHandler={activateIconHandler}
			/>
			<div className={styles.tilesBox}>
				{/* {categoriesTiles} */}
				<CategoryTile icon='💼' title='Work' doneTasks={3} allTasks={4} background='#4BB1F8' />
				<CategoryTile icon='💊' title='Health' doneTasks={6} allTasks={12} background='#53DB89' />
				<CategoryTile icon='🔏' title='Private' doneTasks={1} allTasks={3} background='#F98A4B' />
				<CategoryTile icon='🏠' title='Home' doneTasks={2} allTasks={3} background='#F37070' />
				<CategoryTile icon='🛒' title='Shop' doneTasks={0} allTasks={15} background='#838FA4' />
				<button className={styles.addCategoryBtn}>
					<FontAwesomeIcon icon={fas('plus')} />
					</button>
			</div>
		</Fragment>
	);
};

export default Main;
