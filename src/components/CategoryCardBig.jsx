import styles from './CategoryCardBig.module.css';

import Wrapper from './Wrapper';

import TakeMeHomeButton from './GoBackBtn';
import ListItemBig from './ListItemBig';
import TaskContext from '../store/task-context';
import { useContext, useEffect, useState } from 'react';

const CategoryCardBig = props => {
	const [categories, setCategories] = useState([]);
	const [categoryToShow, setCategoryToShow] = useState({});
	const [tasksToRender, setTasksToRender] = useState([]);

	const categoriesCtx = useContext(TaskContext);

	useEffect(() => {
		const loadedCategories = [];

		for (const key in categoriesCtx.categories) {
			loadedCategories.push({
				key: key,
				id: categoriesCtx.categories[key].id,
				color: categoriesCtx.categories[key].color,
				icon: categoriesCtx.categories[key].icon,
				tasks: categoriesCtx.categories[key].tasks,
				allTasks: categoriesCtx.categories[key].allTasks,
				doneTasks: categoriesCtx.categories[key].tasksDone,
			});
		}

		setCategories(loadedCategories);
	}, [categoriesCtx]);

	useEffect(() => {
		categories.forEach(category => {
			if (props.clickedTile === category.id) {
				setCategoryToShow(category);
				setTasksToRender(category.tasks);
			}
		});
	}, [categories, props.clickedTile]);

	console.log(categoryToShow.tasks);

	return (
		<div
			className={styles.background}
			style={{ backgroundColor: categoryToShow.color }}>
			<Wrapper>
				<TakeMeHomeButton linkTo='/' />
				<div className={styles.header}>
					<div
						className={
							categoryToShow.doneTasks / categoryToShow.allTasks === 1
								? `${styles.iconBox} ${styles.iconBoxFull}`
								: styles.iconBox
						}>
						<svg
							className={styles.circle}
							viewBox='0 0 100 100'
							xmlns='http://www.w3.org/2000/svg'
							transform='rotate(-90)'>
							<circle
								cx='50'
								cy='50'
								r='45'
								fill='none'
								stroke='white'
								strokeWidth='10'
								pathLength='1'
								strokeDasharray={`${
									categoryToShow.doneTasks / categoryToShow.allTasks
								} 1`}
							/>
						</svg>
						<p className={styles.emoji}>{categoryToShow.icon}</p>
					</div>
					<div className={styles.titleBox}>
						<h3 className={styles.title}>{categoryToShow.id}</h3>
						<p
							className={
								styles.counter
							}>{`${categoryToShow.doneTasks} of ${categoryToShow.allTasks} tasks`}</p>
					</div>
				</div>
				<div id='itemBoxUndone' className={styles.itemBox}>
					{tasksToRender.map(task => {
						if (!task.isDone) {
							return (
								<ListItemBig
									id={task.id}
									isDone={task.isDone}
									text={task.text}
								/>
							);
						}
						return null;
					})}
				</div>
				<div id='itemBoxDone' className={styles.itemBox}>
					{tasksToRender.map(task => {
						if (task.isDone) {
							return (
								<ListItemBig
									id={task.id}
									isDone={task.isDone}
									text={task.text}
								/>
							);
						}
						return null;
					})}
				</div>
			</Wrapper>
		</div>
	);
};

export default CategoryCardBig;
