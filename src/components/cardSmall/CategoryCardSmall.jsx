import { Link, useNavigate } from 'react-router-dom';

import ListItemSmall from './ListItemSmall';

import styles from './CategoryCardSmall.module.css';

const CategoryCardSmall = props => {

	const navigate = useNavigate();

	const navData = id => {
		navigate('', {
			state: {
				id: '',
			},
		});
	};

	const taskCounterValue =
		props.allTasksCounter(props.tasks) - props.tasksDoneCounter(props.tasks);

	const items = props.tasks.map(task => {
		if (!task.isDone) {
			return (
				<ListItemSmall
					key={task.id}
					id={task.id}
					text={task.text}
					completeTask={props.context.editTask}
				/>
			);
		} else {
			return null;
		}
	});

	const tasksDoneValue = props.tasksDoneCounter(props.tasks);
	const tasksAllValue = props.allTasksCounter(props.tasks);

	const calcValue = (a, b) => {
		return ((a / b) * 100).toFixed(0);
	};

	let percentageInfoText = '0 %';

	let barLength = 0;

	if (tasksAllValue > 0) {
		percentageInfoText = `${calcValue(tasksDoneValue, tasksAllValue)} %`;
		barLength = calcValue(tasksDoneValue, tasksAllValue);
	}

	return (
		<div className={styles.smallCard} style={{ backgroundColor: props.bgc }}>
			<div className={styles.content}>
				<div className={styles.header}>
					<Link
						to={`/main/${props.id}`}
						state={{ id: props.id }}
						className={styles.titleLink}
						onClick={navData}>
						<p className={styles.icon}>{props.icon}</p>
						<h3 className={styles.title}>{props.title}</h3>
					</Link>
					<p className={styles.taskCounter}>
						{taskCounterValue !== 1
							? `${taskCounterValue} tasks waiting to complete`
							: `1 task waiting to complete`}
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
							x2={barLength}
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
