import styles from './ListItemSmall.module.css';
import { BsSquare } from 'react-icons/bs';

const ListItemSmall = props => {
	return (
		<div className={styles.listItem}>
			<button
				className={styles.checkboxBtn}
				onClick={e => props.completeTask(props.id, {isDone:true})}>
				<BsSquare className={styles.square} />
			</button>
			<p className={styles.itemText}>{props.text}</p>
		</div>
	);
};

export default ListItemSmall;
