import styles from './ListItemSmall.module.css';
import { BsSquare } from 'react-icons/bs';

const ListItemSmall = props => {
	return (
		<div className={styles.listItem}>
			<button
				className={styles.checkboxBtn}
				onClick={e => props.setTaskToCompleteId(props.id)}>
				<BsSquare className={styles.square} />
			</button>
			<p className={styles.itemText}>{props.id}</p>
		</div>
	);
};

export default ListItemSmall;
