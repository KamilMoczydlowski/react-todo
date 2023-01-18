import { useContext } from 'react';

import DataContext from '../../store/data-context'

import Wrapper from '../layout/Wrapper';
import UserGreeting from './UserGreeting';
import TilesBox from '../tiles/TilesBox';
import SmallCardBox from '../cardSmall/SmallCardBox';

const MainContent = () => {
	const dataCtx = useContext(DataContext);

	const categories = dataCtx.categoriesWithTasks;

	let tasksToDo = dataCtx.allTaskToDoCounter();

	return (
		<Wrapper>
			<UserGreeting
				categoriesLength={categories.length}
				tasks={dataCtx.tasks}
				taskCount={tasksToDo}
				activeIcon={dataCtx.activeIcon}
				activateIconHandler={dataCtx.toggleActiveIcon}
			/>
			{dataCtx.activeIcon === 'tilesButton' ? (
				<TilesBox arrCategories={categories} context={dataCtx} />
			) : (
				<SmallCardBox arrCategories={categories} context={dataCtx} />
			)}
		</Wrapper>
	);
};

export default MainContent;
