import SearchBar from './SearchBar';

import { FaSquareFull } from 'react-icons/fa';

import styles from './UserGreeting.module.css';

const UserGreeting = props => {

	const nameBig = props.user.charAt(0).toUpperCase() + props.user.slice(1)
	
	return (
		<>
			<SearchBar />
			<h2 className={styles.greetingsTitle}>Hello {nameBig}</h2>
			<div className={styles.greetingsBox}>
				{props.taskCount > 1 && <p className={styles.greetingsText}>
					<span className={styles.countHighlight}>{props.taskCount} tasks</span>{' '}
					are waiting to complete!
				</p>}
				{props.taskCount === 1 && <p className={styles.greetingsText}>
					<span className={styles.countHighlight}>{props.taskCount} task</span>{' '}
					is waiting to complete!
				</p>}
				{props.taskCount === 0 && <p className={styles.greetingsText}>
					<span className={styles.countHighlight}>All tasks</span>{' '}
					are completed!
				</p>}
				<div className={styles.iconBox}>
					<button
						id='tilesButton'
						className={styles.iconButton}
						onClick={props.activateIconHandler}>
						<div
							className={
								props.activeIcon === 'tilesButton'
									? `${styles.squareBox} ${styles.icon} ${styles.iconActive}`
									: `${styles.squareBox} ${styles.icon}`
							}>
							<FaSquareFull
									className={styles.tilesIcon}
								/>
							<FaSquareFull
									className={styles.tilesIcon}
								/>
							<FaSquareFull
									className={styles.tilesIcon}
								/>
							<FaSquareFull
									className={styles.tilesIcon}
								/>
						</div>
					</button>
					<button
						id='squareButton'
						className={styles.iconButton}
						onClick={props.activateIconHandler}>
						<FaSquareFull
							className={
								props.activeIcon === 'squareButton'
									? `${styles.icon} ${styles.iconActive}`
									: styles.icon
							}
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default UserGreeting;
