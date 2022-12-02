import styles from './SubmitBtnWithError.module.css';

const SubmitBtnWithError = props => {
	return (
		<div className={styles.btnBox}>
			{props.error && (
				<div className={styles.erroBox}>
					<p className={styles.errorMsgText}>{props.error}</p>
				</div>
			)}
			<button className={styles.submitBtn} onClick={props.onClick}>
				{props.text}
			</button>
		</div>
	);
};

export default SubmitBtnWithError;
