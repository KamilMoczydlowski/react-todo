import { useState, useRef, useContext, useEffect, useMemo } from 'react';

import TaskContext from '../store/data-context';

import SearchListItem from './SearchListItem';
import MenuBox from './MenuBox';

import { GoSearch, GoGear } from 'react-icons/go';

import styles from './SearchBar.module.css';

const SearchBar = props => {
	const [isInputActive, setIsInputActive] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	
	const [tasks, setTasks] = useState([]);
	const [query, setQuery] = useState('');

	const inputRef = useRef();

	const categoriesCtx = useContext(TaskContext);

	useEffect(() => {
		let items = [];

		categoriesCtx.categories.forEach(category => {
			category.tasks.forEach(task => {
				items.push(task);
			});
		});

		setTasks(items);
	}, [categoriesCtx.categories]);

	const filteredItems = useMemo(() => {
		return tasks.filter(task => {
			return task.id.toLowerCase().includes(query.toLowerCase());
		});
	}, [tasks, query]);

	const showInputHandler = e => {
		if (!isInputActive) {
			setIsInputActive(true);
			setShowMenu(false);
		} else {
			setIsInputActive(false);
			setQuery('');
			setShowMenu(false);
		}
	};

	const showMenuHandler = e => {
		if (!showMenu) {
			setShowMenu(true);
			setIsInputActive(false);
			setQuery('');
		} else {
			setShowMenu(false);
		}
	};

	const items = filteredItems.map(item => {
		if (item.isDone) {
			return (
				<SearchListItem
					key={item.id}
					category={item.category}
					text={item.id}
					color={'#999'}
					done={item.isDone}
				/>
			);
		} else {
			return (
				<SearchListItem
					key={item.id}
					category={item.category}
					text={item.id}
					color={'#000'}
				/>
			);
		}
	});

	return (
		<div className={styles.searchBarBox}>
			<div className={styles.inputBox}>
				<input
					ref={inputRef}
					type='search'
					placeholder='Search tasks...'
					className={
						isInputActive
							? `${styles.input} ${styles.inputActive}`
							: styles.input
					}
					value={query}
					onChange={e => {
						setQuery(e.target.value);
					}}
				/>
				<div className={styles.iconBox} onClick={showInputHandler}>
					<GoSearch
						className={
							isInputActive
								? `${styles.icon} ${styles.glassActive}`
								: styles.icon
						}
					/>
				</div>
			</div>
			<div className={styles.iconBox} onClick={showMenuHandler}>
				<GoGear
					className={
						showMenu ? `${styles.icon} ${styles.gearActive}` : styles.icon
					}
				/>
			</div>
			{query && <div className={styles.itemsList}>{items}</div>}
			<MenuBox show={showMenu} closed={!showMenu} showMenu={setShowMenu} />
		</div>
	);
};

export default SearchBar;
