import { Link } from 'react-router-dom';

import { GoPlus } from 'react-icons/go';

const AddNewTaskBtn = props => {
	let link = '';

	if (props.categoriesLength > 0) {
		link = 'addNewTask';
	} else {
		link = 'addNewCategory';
	}

	return (
		<Link to={`/${link}`} className={props.cssStyle}>
			<GoPlus />
		</Link>
	);
};

export default AddNewTaskBtn;
