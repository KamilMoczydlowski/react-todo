import styles from './BigCardHeader.module.css'

const BigCardHeader = (props) => {
    return (
        <div className={styles.header}>
					<div
						className={
							props.tasksDone / props.allTasks === 1
								? `${styles.iconBox} ${styles.iconBoxFull}`
								: styles.iconBox
						}>
						<svg
							className={styles.circle}
							viewBox='0 0 100 100'
							xmlns='http://www.w3.org/2000/svg'>
							<circle
								cx='50'
								cy='50'
								r='45'
								fill='none'
								stroke='white'
								strokeWidth='10'
								pathLength='1'
								strokeDasharray={`${
									props.tasksDone / props.allTasks
								} 1`}
							/>
						</svg>
						<p className={styles.emoji}>{props.icon}</p>
					</div>
					<div className={styles.titleBox}>
						<h3 className={styles.title}>{props.id}</h3>
						<p
							className={
								styles.counter
							}>{`${props.tasksDone} of ${props.allTasks} tasks`}</p>
					</div>
				</div>
    )
}

export default BigCardHeader