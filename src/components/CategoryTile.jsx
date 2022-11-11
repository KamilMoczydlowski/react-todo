import styles from './CategoryTile.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';

const CategoryTile = props => {
	return (
		<div className={styles.tile} style={{ backgroundColor: props.background }}>
			<div className={styles.titleBox}>
                <p className={styles.emoji}>{props.icon}</p>
                <h4 className={styles.title}>{props.title}</h4>
            </div>
			<div className={styles.counterBox}>
				<p
					className={styles.counter}>{`${props.doneTasks} of ${props.allTasks}`}</p>
				<div className={styles.circleBox}>
					<svg
						viewBox='0 0 100 100'
						xmlns='http://www.w3.org/2000/svg'
						transform='rotate(-90)'>
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
							strokeDasharray={`${props.doneTasks / props.allTasks} 1`}
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default CategoryTile;
