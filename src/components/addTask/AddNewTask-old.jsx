import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import DataContext from '../../store/data-context';

import Wrapper from '../layout/Wrapper';
import CategoryButton from './CategoryButton';
import TakeMeHomeButton from '../ui/btns/GoBackBtn';
import SubmitBtnWithError from '../ui/btns/SubmitBtnWithError';

import styles from './AddNewTask.module.css';
import categoryButtonStyles from './CategoryButton.module.css';

import { activeHandler } from '../addCategory/AddNewCategory';

const AddNewTask = props => {
	const [activeCategoryButton, setActiveCategoryButton] = useState();
	const [inputValue, setInputValue] = useState()

	const dataCtx = useContext(DataContext);

	const categories = dataCtx.categoriesWithTasks;
	const createTask = dataCtx.createTask;

	const navigate = useNavigate();

	const inputRef = useRef();

	const [errorMsg, setErrorMsg] = useState('');

	const activeButtonHandler = e => {
		activeHandler(
			e,
			activeCategoryButton,
			setActiveCategoryButton,
			categoryButtonStyles.active
		);
	};

	const categoriesList = categories.map(category => {
		return (
			<CategoryButton
				key={category.id}
				id={category.id}
				title={category.title}
				color={category.color}
				activateButton={activeButtonHandler}
			/>
		);
	});

	const addTaskHandler = () => {
		if (inputRef.current.value !== '' && activeCategoryButton) {
			setInputValue(inputRef.current.value)

			setErrorMsg('');

			createTask({
				toCategory: activeCategoryButton.id,
				text: inputRef.current.value,
				isDone: false,
			});

			setInputValue('');
			navigate('/main');
			
		} else if (inputRef.current.value === '') {
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
							ref={inputRef}
							value={inputValue}
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
