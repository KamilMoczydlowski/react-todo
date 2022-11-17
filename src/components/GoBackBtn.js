import { Link } from 'react-router-dom';

import styles from './GoBackBtn.module.css';

const GoBackBtn = props => {
	return (
		<Link to={props.linkTo} className={styles.goBackLink}>
			<i className='fa-solid fa-angle-left'></i>
		</Link>
	);
};

export default GoBackBtn;
