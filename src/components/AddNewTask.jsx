import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskContext from '../store/task-context';
import styles from './AddNewTask.module.css';
import categoryButtonStyles from './CategoryButton.module.css';
import CategoryButton from './CategoryButton';
import TakeMeHomeButton from './GoBackBtn';
import Wrapper from './Wrapper';

const AddNewTask = props => {
	const inputValue = useRef();

	const [categories, setCategories] = useState([]);

	const [activeCategoryButton, setActiveCategoryButton] = useState();

	const [errorMsg, setErrorMsg] = useState('');

	const taskCtx = useContext(TaskContext);

	useEffect(() => {
		const loadedCategories = [];

		for (const key in taskCtx.categories) {
			loadedCategories.push({
				key: key,
				id: taskCtx.categories[key].id,
				title: taskCtx.categories[key].id,
				color: taskCtx.categories[key].color,
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
				id={category.id}
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
			console.log(activeCategoryButton.id);
		} else if (inputValue.current.value === '') {
			setErrorMsg('invalid input!');
		} else {
			setErrorMsg('choose category!');
		}
	};

	return (
		<div className={styles.background}>
			<Wrapper>
				<TakeMeHomeButton linkTo='/' />
				<div className={styles.containerTop}>
					<h2 className={styles.title}>Add new task</h2>
					<input
						ref={inputValue}
						className={styles.input}
						placeholder='type your task here'></input>
					<div className={styles.categoriesBox}>
						{categoriesList}
						<Link to='/addNewCategory' className={styles.addCategoryLink}>
							+ ADD CATEGORY
						</Link>
					</div>
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
