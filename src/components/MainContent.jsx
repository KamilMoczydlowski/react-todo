import { useState, useContext } from 'react';
import DataContext from '../store/data-context';

import { useEffect } from 'react';

import TilesBox from './TilesBox';

import UserGreeting from './UserGreeting';
import SmallCardBox from './SmallCardBox';
import Wrapper from './Wrapper';

const MainContent = () => {
	const [taskCount, setTaskCount] = useState(0);

	const dataCtx = useContext(DataContext);

	useEffect(() => {
		let tasksToDo = 0;
		dataCtx.categories.forEach(category => { 
			category.tasks.forEach(task => {
				if (task.isDone === false) {
					tasksToDo++;
				}
			});
		});
		setTaskCount(tasksToDo);
		
	}, [dataCtx.categories])

	return (
		<Wrapper>
			<UserGreeting
				user={dataCtx.userName}
				taskCount={taskCount}
				activeIcon={dataCtx.activeIcon}
				activateIconHandler={dataCtx.toggleActiveIcon}
			/>
			{dataCtx.activeIcon === 'tilesButton' ? <TilesBox /> : <SmallCardBox />}
		</Wrapper>
	);
};

export default MainContent;
