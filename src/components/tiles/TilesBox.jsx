import CategoryTile from './CategoryTile';
import AddNewTaskBtn from '../ui/btns/AddNewTaskBtn';

import styles from './TilesBox.module.css';

const TilesBox = props => {

	const categoryTilesList = props.context.categoriesWithTasks.map(category => (
		<CategoryTile
			key={category.id}
			id={category.id}
			icon={category.icon}
			title={category.title}
			background={category.color}
			tasks={category.filteredTasks}
			calcAllTasks={props.context.calcAllTasksInCategory}
			calcDoneTasks={props.context.calcDoneTasksinCategory}
		/>
	));

	return (
		<div className={styles.tilesBox}>
			{categoryTilesList}
			<AddNewTaskBtn categoriesLength={props.arrCategories.length} cssStyle={styles.addTaskLink} />
		</div>
	);
};

export default TilesBox;
