import { useContext, useEffect, useState } from 'react';

import Wrapper from './Wrapper';

import DeletePopup from './DeletePopup';
import EditItemPopup from './EditItemPopup';

import TakeMeHomeButton from './GoBackBtn';
import BigCardHeader from './BigCardHeader';
import ListItemBig from './ListItemBig';

import TaskContext from '../store/data-context';

import { RiDeleteBin6Line } from 'react-icons/ri';

import styles from './CategoryCardBig.module.css';

const CategoryCardBig = props => {
	const [categoryToShow, setCategoryToShow] = useState({});
	const [tasksToRender, setTasksToRender] = useState([]);
	const [showPopupDeleteItem, setShowPopupDeleteItem] = useState(false);
	const [showPopupDeleteCategory, setShowPopupDeleteCategory] = useState(false);
	const [showEditPopup, setShowEditPopup] = useState(false);
	const [clickedTask, setClickedTask] = useState({});
	const [taskToCompleteId, setTaskToCompleteId] = useState('');

	const categoriesCtx = useContext(TaskContext);

	useEffect(() => {
		categoriesCtx.categories.forEach(category => {
			if (props.clickedTile === category.id) {
				setCategoryToShow(category);
				setTasksToRender(category.tasks);
			} else {
				return null;
			}
		});

		categoriesCtx.categories.forEach(category => {
			category.tasks.forEach(task => {
				if (task.id === taskToCompleteId) {
					task.isDone = true;
					setTaskToCompleteId('');
				} else {
					return null;
				}
			});
		});
	}, [categoriesCtx, props.clickedTile, taskToCompleteId]);

	return (
		<div
			className={styles.background}
			style={{ backgroundColor: categoryToShow.color }}>
			<Wrapper>
				<div className={styles.IconBox}>
					<TakeMeHomeButton linkTo='/main' />
					<button className={styles.trashBtn} onClick={e => setShowPopupDeleteCategory(true)}>
						<RiDeleteBin6Line className={styles.trashIcon} />
					</button>
				</div>
				<BigCardHeader
					id={categoryToShow.id}
					icon={categoryToShow.icon}
					tasksDone={categoryToShow.tasksDone}
					allTasks={categoryToShow.allTasks}
				/>
				<div id='itemBoxUndone' className={styles.itemBox}>
					{tasksToRender.map(task => {
						if (!task.isDone) {
							return (
								<ListItemBig
									key={task.id}
									id={task.id}
									isDone={task.isDone}
									setTaskToCompleteId={setTaskToCompleteId}
									setModalDeleteItem={setShowPopupDeleteItem}
									setEditPopup={setShowEditPopup}
									setClickedTask={setClickedTask}
									clickedTask={clickedTask}
								/>
							);
						}
						return null;
					})}
				</div>
				<div id='itemBoxDone' className={styles.itemBox}>
					{tasksToRender.map(task => {
						if (task.isDone) {
							return (
								<ListItemBig
									key={task.id}
									id={task.id}
									isDone={task.isDone}
									setModalDeleteItem={setShowPopupDeleteItem}
									setClickedTask={setClickedTask}
									clickedTask={clickedTask}
								/>
							);
						}
						return null;
					})}
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
					setActiveElement={() => {}}
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
