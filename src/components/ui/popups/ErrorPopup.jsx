import styles from './ErrorPopup.module.css';
import ModalBlueprint from './ModalBlueprint';

const ErrorPopup = props => {
    const close = () => {
        props.closeModal(null)
    }
	return (
		<>
			<ModalBlueprint text={props.errorMsg}>
				<div className={styles.btnBox}>
					<button className={styles.okBtn} onClick={close}>OK</button>
				</div>
			</ModalBlueprint>
		</>
	);
};

export default ErrorPopup;
