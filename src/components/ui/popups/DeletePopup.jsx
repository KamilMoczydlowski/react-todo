import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import DataContext from '../../../store/data-context';

import styles from './DeletePopup.module.css';
import ModalBlueprint from './ModalBlueprint';

const DeletePopup = props => {
	const dataCtx = useContext(DataContext);

	const navigate = useNavigate();

	const makeItDisappear = () => {
		if (props.keyWord === 'task') {
			dataCtx.deleteTask(props.activeElement.id);
		} else {
			dataCtx.deleteCategory(props.activeElement.id);
			navigate('/main');
		}
		props.showPopup(false);
	};

	const abortDisappearing = () => {
		props.showPopup(false);
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
