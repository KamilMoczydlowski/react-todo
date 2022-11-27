import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ListItemSmall from './ListItemSmall';

import TaskContext from '../store/data-context';

import styles from './CategoryCardSmall.module.css';

const CategoryCardSmall = props => {
	const [taskToCompleteId, setTaskToCompleteId] = useState('');

	const categoriesCtx = useContext(TaskContext);

	const navigate = useNavigate();

	const navData = id => {
		navigate('', {
			state: {
				id: '',
			},
		});
	};

	useEffect(() => {
		categoriesCtx.categories.forEach(category => {
			category.tasks.forEach(task => {
				if (task.id === taskToCompleteId) {
					task.isDone = true;
					setTaskToCompleteId('');
				} else {
					return null;
				}
			});
		});
	}, [categoriesCtx.categories, taskToCompleteId]);

	const taskCounterValue = props.allTasksCounter - props.tasksDoneCounter;

	const items = props.tasks.map(task => {
		if (!task.isDone) {
			return (
				<ListItemSmall
					key={task.id}
					id={task.id}
					setTaskToCompleteId={setTaskToCompleteId}
				/>
			);
		} else {
			return null;
		}
	});

	const percentageInfoText = `${(
		(props.tasksDoneCounter / props.allTasksCounter) *
		100
	).toFixed(0)} %`;

	return (
		<div className={styles.smallCard} style={{ backgroundColor: props.bgc }}>
			<div className={styles.content}>
				<div className={styles.header}>
					<Link
						to={`/main/${props.title}`}
						state={{ id: props.title }}
						className={styles.titleLink}
						onClick={navData}>
						<p className={styles.icon}>{props.icon}</p>
						<h3 className={styles.title}>{props.title}</h3>
					</Link>
					<p className={styles.taskCounter}>
						{taskCounterValue !== 1
							? `${taskCounterValue} tasks waiting to complete`
							: `1 waiting task to complete`}
					</p>
				</div>
				<div className={styles.listBox}>{items}</div>
				<div className={styles.loadingBarBox}>
					<p className={styles.percentageInfo}>{percentageInfoText}</p>
					<svg viewBox='0 0 100 5' xmlns='http://www.w3.org/2000/svg'>
						<line
							className={styles.barBgc}
							x1='0'
							y1='0'
							x2='100'
							y2='0'
							stroke='white'
							strokeWidth='5'
						/>
						<line
							x1='0'
							y1='0'
							x2={(
								(props.tasksDoneCounter / props.allTasksCounter) *
								100
							).toFixed(0)}
							y2='0'
							stroke='white'
							strokeWidth='5'
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default CategoryCardSmall;
