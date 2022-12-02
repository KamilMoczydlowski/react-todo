import styles from './CategoryButton.module.css';

const CategoryButton = props => {
	return (
		<button
			id={props.id}
			title={props.title}
			className={styles.button}
			onClick={props.activateButton}>
			<div style={{ backgroundColor: props.color }} className={styles.square} />
			<p className={styles.title}>{props.title}</p>
		</button>
	);
};

export default CategoryButton;
