import styles from './ListItemBig.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, far } from 'fontawesome.macro';

const ListItemBig = props => {
	if (props.isDone) {
		return (
			<div className={styles.ListItem}>
				<div className={styles.checkboxBox}>
					{<FontAwesomeIcon icon={fas('check')} />}
				</div>
				<div className={`${styles.content} ${styles.contentDone}`}>
					<p>
						{props.text}
					</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.ListItem}>
				<div className={styles.checkboxBox}>
					{<FontAwesomeIcon icon={far('square')} />}
				</div>
				<div className={`${styles.content} ${styles.contentUndone}`}>
					<p>
						{props.text}
					</p>
				</div>
			</div>
		);
	}
};

export default ListItemBig;
