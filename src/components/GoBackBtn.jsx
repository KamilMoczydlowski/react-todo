import { Link } from 'react-router-dom';

import { GoChevronLeft } from 'react-icons/go';


import styles from './GoBackBtn.module.css';

const GoBackBtn = props => {
	return (
		<Link to={props.linkTo} className={styles.goBackLink}>
			<GoChevronLeft />
		</Link>
	);
};

export default GoBackBtn;
