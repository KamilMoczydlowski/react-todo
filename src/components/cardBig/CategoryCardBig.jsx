import { useContext, useState } from 'react';

import DataContext from '../../store/data-context';

import Wrapper from '../layout/Wrapper';

import DeletePopup from '../ui/popups/DeletePopup';
import EditItemPopup from '../ui/popups/EditItemPopup';

import TakeMeHomeButton from '../ui/btns/GoBackBtn';

import BigCardHeader from './BigCardHeader';
import ListItemBig from './ListItemBig';

import { RiDeleteBin6Line } from 'react-icons/ri';

import styles from './CategoryCardBig.module.css';

const CategoryCardBig = props => {
	const [showPopupDeleteItem, setShowPopupDeleteItem] = useState(false);
	const [showPopupDeleteCategory, setShowPopupDeleteCategory] = useState(false);
	const [showEditPopup, setShowEditPopup] = useState(false);
	const [clickedTask, setClickedTask] = useState({});

	const dataCtx = useContext(DataContext);

	const categoryToShow = dataCtx.categoriesWithTasks.filter(category =>
		category.id.includes(props.clickedTileId)
	)[0];

	const tasksAllArr = categoryToShow.filteredTasks;

	const tasksDoneArr = [];

	const tasksUndoneArr = [];

	tasksAllArr.forEach(task => {
		if (task.isDone) {
			tasksDoneArr.push(task);
		} else if (!task.isDone) {
			tasksUndoneArr.push(task);
		} else {
			return null;
		}
	});

	const listOfItemsUndone = tasksUndoneArr.map(task => {
		return (
			<ListItemBig
				key={task.id}
				id={task.id}
				text={task.text}
				isDone={task.isDone}
				setModalDeleteItem={setShowPopupDeleteItem}
				setEditPopup={setShowEditPopup}
				setClickedTask={setClickedTask}
				clickedTask={clickedTask}
				completeTask={dataCtx.editTask}
			/>
		);
	});

	const listOfItemDone = tasksDoneArr.map(task => {
		return (
			<ListItemBig
				key={task.id}
				id={task.id}
				text={task.text}
				isDone={task.isDone}
				setModalDeleteItem={setShowPopupDeleteItem}
				setClickedTask={setClickedTask}
				clickedTask={clickedTask}
			/>
		);
	});

	const tasksDoneValue = dataCtx.calcDoneTasksinCategory(tasksAllArr);
	const tasksAllValue = dataCtx.calcAllTasksInCategory(tasksAllArr);

	return (
		<div
			className={styles.background}
			style={{ backgroundColor: categoryToShow.color }}>
			<Wrapper>
				<div className={styles.IconBox}>
					<TakeMeHomeButton linkTo='/main' />
					<button
						className={styles.trashBtn}
						onClick={e => setShowPopupDeleteCategory(true)}>
						<RiDeleteBin6Line className={styles.trashIcon} />
					</button>
				</div>
				<BigCardHeader
					title={categoryToShow.title}
					icon={categoryToShow.icon}
					tasksDone={tasksDoneValue}
					allTasks={tasksAllValue}
				/>
				<div id='itemBoxUndone' className={styles.itemBox}>
					{listOfItemsUndone}
				</div>
				<div id='itemBoxDone' className={styles.itemBox}>
					{listOfItemDone}
				</div>
			</Wrapper>
			{showPopupDeleteItem && (
				<DeletePopup
					keyWord='task'
					showPopup={setShowPopupDeleteItem}
					activeElement={clickedTask}
					setActiveElement={setClickedTask}
				/>
			)}
			{showPopupDeleteCategory && (
				<DeletePopup
					keyWord='category'
					showPopup={setShowPopupDeleteCategory}
					activeElement={categoryToShow}
					// setActiveElement={() => {}}
				/>
			)}
			{showEditPopup && (
				<EditItemPopup
					showPopup={setShowEditPopup}
					clickedTask={clickedTask}
					setClickedTask={setClickedTask}
				/>
			)}
		</div>
	);
};

export default CategoryCardBig;
