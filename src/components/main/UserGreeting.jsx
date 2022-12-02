import SearchBar from '../searchBar/SearchBar';

import { FaSquareFull } from 'react-icons/fa';

import styles from './UserGreeting.module.css';

const UserGreeting = props => {
	const userName = localStorage.getItem('userName');

	const name = userName

	return (
		<>
			<SearchBar tasks={props.tasks} />
			<h2 className={styles.greetingsTitle}>Hello {name}</h2>
			<div className={styles.greetingsBox}>
				{props.taskCount > 1 && (
					<p className={styles.greetingsText}>
						<span className={styles.countHighlight}>
							{props.taskCount} tasks
						</span>{' '}
						are waiting to complete!
					</p>
				)}
				{props.taskCount === 1 && (
					<p className={styles.greetingsText}>
						<span className={styles.countHighlight}>
							{props.taskCount} task
						</span>{' '}
						is waiting to complete!
					</p>
				)}
				{props.taskCount === 0 && (
					<p className={styles.greetingsText}>
						<span className={styles.countHighlight}>0 tasks</span> to complete.
					</p>
				)}
				{props.categoriesLength > 0 && <div className={styles.iconBox}>
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
							<FaSquareFull className={styles.tilesIcon} />
							<FaSquareFull className={styles.tilesIcon} />
							<FaSquareFull className={styles.tilesIcon} />
							<FaSquareFull className={styles.tilesIcon} />
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
				</div>}
			</div>
		</>
	);
};

export default UserGreeting;
