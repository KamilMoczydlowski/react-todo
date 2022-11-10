import styles from './TakeMeHomeButton.module.css';

const TakeMeHomeButton = props => {
	return (
		<button className={styles.button}>
			<i className='fa-solid fa-angle-left'></i>
		</button>
	);
};

export default TakeMeHomeButton;
