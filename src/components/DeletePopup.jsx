import styles from './DeletePopup.module.css';
import ModalBlueprint from './ModalBlueprint';

const DeletePopup = props => {
	
	const makeItDisappear = () => {
		console.log(props.activeElement);
		props.showPopup(false);
		props.setActiveElement({});
	};

	const abortDisappearing = () => {
		props.showPopup(false);
		props.setActiveElement({});
	};

	return (
		<ModalBlueprint
			text={`Are you sure you want to delete this ${props.keyWord}?`}>
			<div className={styles.btnsBox}>
				<button
					className={`${styles.btn} ${styles.btnDelete}`}
					onClick={makeItDisappear}>
					Delete
				</button>
				<button className={styles.btn} onClick={abortDisappearing}>
					Cancel
				</button>
			</div>
		</ModalBlueprint>
	);
};

export default DeletePopup;
