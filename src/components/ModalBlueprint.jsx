import styles from './ModalBlueprint.module.css';

const ModalBlueprint = props => {
	return (
		<>
			<div className={styles.shadow}></div>
			<div className={styles.centered}>
				<div className={styles.popup}>
					<div className={styles.popupHeader}>
						<p className={styles.text}>{props.text}</p>
					</div>
                    <div className={styles.popupContent}>
                        {props.children}
                    </div>
					
				</div>
			</div>
		</>
	);
};

export default ModalBlueprint;
