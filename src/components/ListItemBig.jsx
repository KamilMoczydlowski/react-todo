import styles from './ListItemBig.module.css';

import { BsSquare } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';

const ListItemBig = props => {
	
	const showBtnsHandler = e => {
		props.setClickedTask(props);
	};

	return (
		<div className={styles.ListItem}>
			<div className={styles.checkboxBox}>
				{!props.isDone ? (
					<button
						className={styles.squareBtn}
						onClick={e => props.setTaskToCompleteId(props.id)}>
						<BsSquare className={styles.squareIcon} />
					</button>
				) : (
					<AiOutlineCheck className={styles.checkIcon} />
				)}
			</div>
			<div
				id={props.id}
				className={`${styles.content} ${
					props.isDone ? styles.contentDone : styles.contentUndone
				}`}>
				<p onClick={showBtnsHandler}>{props.id}</p>
				<div
					className={
						!(props.clickedTask.id === props.id)
							? styles.optionsBox
							: `${styles.optionsBox} ${styles.optionsBoxActive}`
					}>
					<div
						className={styles.shadow}
						onClick={e => props.setClickedTask({})}></div>
					<div className={styles.btnBox}>
						{!props.isDone && (
							<button
								className={`${styles.contentBtn} ${
									!props.isDone ? styles.ctaBtn : ''
								}`}
								onClick={e => props.setEditPopup(true)}>
								Edit
							</button>
						)}
						<button
							className={`${styles.contentBtn} ${
								props.isDone ? styles.ctaBtn : ''
							}`}
							onClick={e => props.setModalDeleteItem(true)}>
							Delete
						</button>
						<button
							className={styles.contentBtn}
							onClick={e => props.setClickedTask({})}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListItemBig;
