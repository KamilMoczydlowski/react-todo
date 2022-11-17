// import { useReducer } from 'react';

import { useCallback, useEffect, useState } from 'react';
import TaskContext from './task-context';

// const taskReducer = (state, action) => {
// 	if (action.type === 'ADD TASK') {
// 	}
// 	if (action.type === 'REMOVE TASK') {
// 	}
// 	if (action.type === 'ADD CATEGORY') {
// 	}
// 	if (action.type === 'REMOVE CATEGORY') {
// 	}

// 	return defaultTaskState;
// };

const TaskProvider = props => {

	const [fetchedCategories, setFetchedCategories] = useState([]);

	const fetchHandler = useCallback(async () => {
		try {
			const response = await fetch(
				'https://react-todo-f2603-default-rtdb.europe-west1.firebasedatabase.app/categories.json'
			);

			if (!response.ok) {
				throw new Response('failed to fetch data', { status: 500 });
			}

			const data = await response.json();

			const loadedCategories = [];

			for (const key in data) {
				loadedCategories.push({
					key: key,
					id: data[key].id,
					color: data[key].color,
					icon: data[key].icon,
					tasks: data[key].tasks,
					tasksDone: data[key].tasksDone,
					allTasks: data[key].allTasks
				});
			}

			setFetchedCategories(loadedCategories);
		} catch (error) {console.log(error)}
	}, []);

	useEffect(() => {
		fetchHandler();
	}, [fetchHandler]);

	// const [taskState, dispatchTaskAction] = useReducer(
	// 	taskReducer,
	// 	defaultTaskState
	// );

	// const addTaskHandler = () => {
	// 	dispatchTaskAction({ type: 'ADD TASK', task: task });
	// };
	// const removeTaskHandler = () => {
	// 	dispatchTaskAction({ type: 'REMOVE TASK', id: taskId });
	// };
	// const addCategoryHandler = () => {
	// 	dispatchTaskAction({ type: 'ADD CATEGORY', category: category });
	// };
	// const removeCategoryHandler = () => {
	// 	dispatchTaskAction({ type: 'REMOVE CATEGORY', id: categoryId });
	// };

	const taskContext = {
		categories: fetchedCategories,
		// categories: [
		// 	{
		// 		key: 'Work',
		// 		id: 'Work',
		// 		icon: '💼',
		// 		color: '#4BB1F8',
		// 		tasks: [
		// 			{ isDone: true, text: 'prepare project1' },
		// 			{ isDone: false, text: 'prepare project2' },
		// 			{ isDone: false, text: 'prepare project3' },
		// 			{ isDone: false, text: 'prepare project4' },
		// 			{ isDone: false, text: 'find job' },
		// 		],
		// 		allTasks: 5,
		// 		tasksDone: 1,
		// 	},
		// 	{
		// 		key: 'Health',
		// 		id: 'Health',
		// 		icon: '💊',
		// 		color: '#53DB89',
		// 		tasks: [
		// 			{ isDone: true, text: 'get sick' },
		// 			{ isDone: true, text: 'go to doctor' },
		// 			{ isDone: false, text: 'get medicine' },
		// 			{ isDone: false, text: 'lay in bed' },
		// 			{ isDone: false, text: 'take drugs' },
		// 		],
		// 		allTasks: 5,
		// 		tasksDone: 2,
		// 	},
		// 	{
		// 		key: 'Private',
		// 		id: 'Private',
		// 		icon: '🔏',
		// 		color: '#F98A4B',
		// 		tasks: [
		// 			{ isDone: true, text: 'put money to the chest' },
		// 			{ isDone: true, text: 'lock chest' },
		// 			{ isDone: true, text: 'dig a hole' },
		// 			{ isDone: false, text: 'put chest into hole' },
		// 			{ isDone: false, text: 'dance around hole' },
		// 		],
		// 		allTasks: 5,
		// 		tasksDone: 3,
		// 	},
		// 	{
		// 		key: 'Home',
		// 		id: 'Home',
		// 		icon: '🏠',
		// 		color: '#F37070',
		// 		tasks: [
		// 			{ isDone: true, text: 'go home' },
		// 			{ isDone: true, text: 'take a nap' },
		// 			{ isDone: true, text: 'turn on tv' },
		// 			{ isDone: true, text: 'watch some movies' },
		// 			{ isDone: false, text: 'go to bed' },
		// 		],
		// 		allTasks: 5,
		// 		tasksDone: 4,
		// 	},
		// 	{
		// 		key: 'Shop',
		// 		id: 'Shop',
		// 		icon: '🛒',
		// 		color: '#838FA4',
		// 		tasks: [
		// 			{ isDone: true, text: 'butter' },
		// 			{ isDone: true, text: 'bread' },
		// 			{ isDone: true, text: 'salad' },
		// 			{ isDone: true, text: 'ham' },
		// 			{ isDone: true, text: 'cheese' },
		// 		],
		// 		allTasks: 5,
		// 		tasksDone: 5,
		// 	},
		// ],
	};

	return (
		<TaskContext.Provider value={taskContext}>
			{props.children}
		</TaskContext.Provider>
	);
};

export default TaskProvider;
