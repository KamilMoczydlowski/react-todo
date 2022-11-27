import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskContext from '../store/data-context';
import styles from './AddNewTask.module.css';
import categoryButtonStyles from './CategoryButton.module.css';
import CategoryButton from './CategoryButton';
import TakeMeHomeButton from './GoBackBtn';
import Wrapper from './Wrapper';
import SubmitBtnWithError from './SubmitBtnWithError';
import { activeHandler } from './AddNewCategory';

const AddNewTask = props => {
	const inputValue = useRef();

	const [activeCategoryButton, setActiveCategoryButton] = useState();

	const [errorMsg, setErrorMsg] = useState('');

	const taskCtx = useContext(TaskContext);

	const activeButtonHandler = e => {
		activeHandler(
			e,
			activeCategoryButton,
			setActiveCategoryButton,
			categoryButtonStyles.active
		);
	};

	const categoriesList = taskCtx.categories.map(category => {
		return (
			<CategoryButton
				key={category.id}
				id={category.id}
				title={category.id}
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
			inputValue.current.value = '';
		} else if (inputValue.current.value === '') {
			setErrorMsg('invalid input!');
		} else {
			setErrorMsg('choose category!');
		}
	};

	return (
		<div className={styles.background}>
			<Wrapper>
				<div className={styles.container}>
					<div className={styles.containerTop}>
					<TakeMeHomeButton linkTo='/main' />
						<h2 className={styles.title}>Add new task</h2>
					</div>
					<div className={styles.inputBox}>
						<input
							ref={inputValue}
							className={styles.input}
							placeholder='type your task here'></input>
						<div className={styles.categoriesBox}>{categoriesList}</div>
						<div className={styles.addCategoryBox}>
							<Link to='/addNewCategory' className={styles.addCategoryLink}>
								+ ADD CATEGORY
							</Link>
						</div>
					</div>
					<SubmitBtnWithError
						onClick={addTaskHandler}
						text={'+ ADD TASK'}
						error={errorMsg}
					/>
				</div>
			</Wrapper>
		</div>
	);
};

export default AddNewTask;
