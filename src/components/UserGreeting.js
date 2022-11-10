import SearchBar from './SearchBar';
import Wrapper from './Wrapper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';

import styles from './UserGreeting.module.css';

const UserGreeting = props => {
	return (
		<Wrapper>
			<SearchBar />
			<h2 className={styles.greetingsTitle}>Hello {props.user}</h2>
			<div className={styles.greetingsBox}>
				<p>
					<span className={styles.countHighlight}>{props.taskCount} tasks</span>{' '}
					are waiting to complete!
				</p>
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
							<FontAwesomeIcon
								icon={fas('square')}
								className={styles.tilesIcon}
							/>
							<FontAwesomeIcon
								icon={fas('square')}
								className={styles.tilesIcon}
							/>
							<FontAwesomeIcon
								icon={fas('square')}
								className={styles.tilesIcon}
							/>
							<FontAwesomeIcon
								icon={fas('square')}
								className={styles.tilesIcon}
							/>
						</div>
					</button>
					<button
						id='squareButton'
						className={styles.iconButton}
						onClick={props.activateIconHandler}>
						<FontAwesomeIcon
							icon={fas('square')}
							className={
								props.activeIcon === 'squareButton'
									? `${styles.icon} ${styles.iconActive}`
									: styles.icon
							}
						/>
					</button>
				</div>
			</div>
		</Wrapper>
	);
};

export default UserGreeting;
