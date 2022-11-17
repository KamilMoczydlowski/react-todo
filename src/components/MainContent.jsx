import { Fragment, useState, useContext } from 'react';

// import styles from './Main.module.css';
import TaskContext from '../store/task-context';

import { useEffect } from 'react';

import TilesBox from './TilesBox';

import UserGreeting from './UserGreeting';
import SmallCardBox from './SmallCardBox';

let user = 'User';

const MainContent = props => {
	const [categories, setCategories] = useState([]);
	const [taskCount, setTaskCount] = useState(0);
	const [activeIcon, setActiveIcon] = useState('tilesButton'); // 'tilesButton' or 'squareButton'
	// const [searchInputValue, setSearchInputValue] = useState('')

	const categoriesCtx = useContext(TaskContext);

	useEffect(() => {
		const loadedCategories = [];

		for (const key in categoriesCtx.categories) {

			loadedCategories.push({
				key: key,
				id: categoriesCtx.categories[key].id,
				tasks: categoriesCtx.categories[key].tasks,
			});
		}

		setCategories(loadedCategories);
	}, [categoriesCtx]);

	useEffect(() => {
		let tasksToDo = 0;
		categories.forEach(category => {
			category.tasks.forEach(task => {
				if (task.isDone === false) {
					tasksToDo++;
				}
			});
		});
		setTaskCount(tasksToDo);
		
	}, [categories])

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
			{activeIcon === 'tilesButton' ? <TilesBox /> : <SmallCardBox />}
		</Fragment>
	);
};

export default MainContent;
