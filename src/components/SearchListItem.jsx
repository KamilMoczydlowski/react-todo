import { Link, useNavigate } from 'react-router-dom';

import { AiOutlineCheck } from 'react-icons/ai';

import styles from './SearchListItem.module.css';

const SearchListItem = props => {
	const navigate = useNavigate();

	const navData = id => {
		navigate('', {
			state: {
				id: '',
			},
		});
	};

	return (
		<Link
			to={`/main/${props.id}`}
			state={{ id: props.category }}
			className={styles.listItem}
			onClick={navData}>
			<p style={{ color: props.color }}>{props.text}</p>
			{props.done && <AiOutlineCheck />}
		</Link>
	);
};
export default SearchListItem;
