import { useState, useContext, useEffect } from 'react';

import CategoryTile from './CategoryTile';
import AddNewTaskBtn from './AddNewTaskBtn';

import DataContext from '../store/data-context';

import styles from './TilesBox.module.css';

const TilesBox = () => {
	const [categoryTilesList, setCategoryTilesList] = useState([]);

	const categoriesCtx = useContext(DataContext);

	useEffect(() => {
		let list = [];

		categoriesCtx.categories.forEach(category => {
			list.push(
				<CategoryTile
					key={category.id}
					id={category.id}
					icon={category.icon}
					title={category.id}
					doneTasks={category.tasksDone}
					allTasks={category.allTasks}
					background={category.color}
				/>
			);
		});

		setCategoryTilesList(list);

	}, [categoriesCtx.categories]);

	return (
		<>
			<div className={styles.tilesBox}>
				{categoryTilesList}
				<AddNewTaskBtn cssStyle={styles.addTaskLink} />
			</div>
		</>
	);
};

export default TilesBox;
