// import { useReducer } from 'react';

import TaskContext from './task-context';

// const defaultTaskState = {
// 	categories: [],
// 	tasks: [],
// };

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
		categories: [
			{
				title: 'School',
				color: 'red',
				icon: '',
				tasks: [
					{
						categoryTitle: 'School',
						text: 'solve riddle',
						isDone: false,
					},
				],
				tasksAmount: 0,
			},
			{
				title: 'Work',
				color: 'blue',
				icon: '',
				tasks: [
					{
						categoryTitle: 'Work',
						text: 'find some',
						isDone: false,
					},
				],
				tasksAmount: 0,
			},
			{
				title: 'Private',
				color: '#000',
				icon: '',
				tasks: [
					{
						categoryTitle: 'Private',
						text: 'learn react',
						isDone: false,
					},
					{
						categoryTitle: 'Private',
						text: 'create todo',
						isDone: false,
					},
				],
				tasksAmount: 0,
			},
		],
	};

	return (
		<TaskContext.Provider value={taskContext}>
			{props.children}
		</TaskContext.Provider>
	);
};

export default TaskProvider;
