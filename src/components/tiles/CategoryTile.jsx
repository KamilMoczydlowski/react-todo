// import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './CategoryTile.module.css';

const CategoryTile = props => {
	const navigate = useNavigate();

	const navData = id => {
		navigate('', {
			state: {
				id: '',
			},
		});
	};

	const numberOfTasksDone = props.calcDoneTasks(props.tasks);

	const numberOfAllTasks = props.calcAllTasks(props.tasks);

	return (
		<Link
			to={`/main/${props.id}`}
			state={{
				id: props.id,
			}}
			id={props.id}
			className={styles.tile}
			style={{ backgroundColor: props.background }}
			onClick={navData}>
			<div className={styles.titleBox}>
				<p className={styles.emoji}>{props.icon}</p>
				<h4 className={styles.title}>{props.title}</h4>
			</div>
			<div className={styles.counterBox}>
				<p
					className={
						styles.counter
					}>{`${numberOfTasksDone} of ${numberOfAllTasks}`}</p>
				<div className={styles.circleBox}>
					<svg
						className={styles.svgCircle}
						viewBox='0 0 100 100'
						xmlns='http://www.w3.org/2000/svg'>
						<circle
							className={styles.circleBackground}
							cx='50'
							cy='50'
							r='40'
							fill='none'
							stroke='white'
							strokeWidth='10'
						/>

						<circle
							cx='50'
							cy='50'
							r='40'
							fill='none'
							stroke='white'
							strokeWidth='10'
							pathLength='1'
							strokeDasharray={`${numberOfTasksDone / numberOfAllTasks} 1`}
						/>
					</svg>
				</div>
			</div>
		</Link>
	);
};

export default CategoryTile;
