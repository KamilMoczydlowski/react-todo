import { useContext, useEffect, useRef, useState } from 'react';
import TaskContext from '../store/task-context';
import styles from './AddNewTask.module.css';
import categoryButtonStyles from './CategoryButton.module.css';
import CategoryButton from './CategoryButton';
import TakeMeHomeButton from './TakeMeHomeButton';
import Wrapper from './Wrapper';

const AddNewTask = props => {
	const inputValue = useRef();
	const [activeCategoryButton, setActiveCategoryButton] = useState();
	const [errorMsg, setErrorMsg] = useState('');

	const [categories, setCategories] = useState([]);

	const taskCtx = useContext(TaskContext);

	useEffect(() => {
		const loadedCategories = [];

		for (const key in taskCtx.categories) {
			loadedCategories.push({
				key: key,
				id: key,
				title: taskCtx.categories[key].title,
				color: taskCtx.categories[key].color,
				icon: taskCtx.categories[key].icon,
				tasksAmount: taskCtx.categories[key].tasksAmount,
			});
		}

		setCategories(loadedCategories);
	}, [taskCtx.categories]);

	const activeButtonHandler = e => {
		if (activeCategoryButton) {
			activeCategoryButton.classList.remove(categoryButtonStyles.active);
			e.target.closest('button').classList.add(categoryButtonStyles.active);
			setActiveCategoryButton(e.target.closest('button'));
		} else if (
			e.target
				.closest('button')
				.classList.contains('CategoryButton_active__ONh41')
		) {
			e.target.closest('button').classList.remove(categoryButtonStyles.active);
			setActiveCategoryButton();
		} else {
			e.target.closest('button').classList.add(categoryButtonStyles.active);
			setActiveCategoryButton(e.target.closest('button'));
		}
	};

	const categoriesList = categories.map(category => {
		return (
			<CategoryButton
				key={category.key}
				id={category.key}
				title={category.title}
				color={category.color}
				activateButton={activeButtonHandler}
			/>
		);
	});

	const addTaskHandler = () => {
		if (inputValue.current.value !== '' && activeCategoryButton) {
			setErrorMsg('');
			console.log(inputValue.current.value);
			console.log(activeCategoryButton.title);
		} else if (inputValue.current.value === '') {
			setErrorMsg('invalid input!');
		} else {
			setErrorMsg('choose category!');
		}
	};

	return (
		<div className={styles.background}>
			<Wrapper>
				<TakeMeHomeButton />
				<div className={styles.containerTop}>
					<h2 className={styles.title}>Add new task</h2>
					<input
						ref={inputValue}
						className={styles.input}
						placeholder='type your task here'></input>
					<div className={styles.categoriesBox}>{categoriesList}</div>
				</div>
				<div className={styles.containerBottom}>
					{errorMsg && (
						<div className={styles.erroBox}>
							<p className={styles.errorMsgText}>{errorMsg}</p>
						</div>
					)}
					<button className={styles.addButton} onClick={addTaskHandler}>
						+ ADD TASK
					</button>
				</div>
			</Wrapper>
		</div>
	);
};

export default AddNewTask;
