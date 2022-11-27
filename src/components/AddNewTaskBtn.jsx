import { Link } from 'react-router-dom';

import { GoPlus } from 'react-icons/go';

const AddNewTaskBtn = (props) => {
	return (
		<Link to='/addNewTask' className={props.cssStyle}>
			<GoPlus />
		</Link>
	);
};

export default AddNewTaskBtn;
