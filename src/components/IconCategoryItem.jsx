import styles from './IconCategoryItem.module.css';

const IconCategoryItem = props => {
	return (
		<button id={props.id} className={styles.btn} onClick={props.onClick}>
			<span className={styles.icon}>{props.icon}</span>
		</button>
	);
};
export default IconCategoryItem;
