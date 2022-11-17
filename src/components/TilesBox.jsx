import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import CategoryTile from './CategoryTile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';

import styles from './TilesBox.module.css';
import { useContext } from 'react';
import TaskContext from '../store/task-context';

const TilesBox = props => {
	const [categories, setCategories] = useState([]);

	const categoriesCtx = useContext(TaskContext);

	useEffect(() => {
		const loadedCategories = [];

		for (const key in categoriesCtx.categories) {
			loadedCategories.push({
				key: key,
				id: categoriesCtx.categories[key].id,
				title: categoriesCtx.categories[key].id,
				color: categoriesCtx.categories[key].color,
				icon: categoriesCtx.categories[key].icon,
				tasksDone: categoriesCtx.categories[key].tasksDone,
				allTasks: categoriesCtx.categories[key].allTasks,
			});
		}

		setCategories(loadedCategories);
	}, [categoriesCtx.categories]);

	return (
		<div className={styles.tilesBox}>
			{categories.map(category => (
				<CategoryTile
					key={category.key}
					id={category.id}
					icon={category.icon}
					title={category.id}
					doneTasks={category.tasksDone}
					allTasks={category.allTasks}
					background={category.color}
				/>
			))}
			<Link to='/addNewTask' className={styles.addTaskLink}>
				<FontAwesomeIcon icon={fas('plus')} />
			</Link>
		</div>
	);
};

export default TilesBox;
