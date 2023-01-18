import { useState, useMemo } from 'react';

import { db } from '../firebase';
import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';

import DataContext from './data-context';

import { useFirebase } from '../hooks/useFirebase';

const DataProvider = props => {
	const [activeIcon, setActiveIcon] = useState('tilesButton'); // 'tilesButton' or 'squareButton' set from 'MainContent.jsx'
	const [translateValue, setTranslateValue] = useState(0); // set from 'SmallCardBox.jsx'
	const [isDark, setIsDark] = useState(false); // set from 'MenuBox.jsx'

	const [categories, setCategories] = useState([]);
	const [tasks, setTasks] = useState([]);

	useFirebase('categories', setCategories);
	useFirebase('tasks', setTasks);

	const categoriesWithTasks = useMemo(() => {
		return categories.map(category => {
			return {
				...category,
				filteredTasks: tasks.filter(task =>
					task.toCategory.includes(category.id)
				),
			};
		});
	}, [categories, tasks]);

	const createCategory = async ({ ...data }) => {
		await addDoc(collection(db, 'categories'), {
			...data,
		});
	};

	const createTask = async ({ ...data }) => {
		await addDoc(collection(db, 'tasks'), {
			...data,
		});
	};

	const editTask = async (id, { ...data }) => {
		await updateDoc(doc(db, 'tasks', id), { ...data });
	};

	const deleteTask = async id => {
		await deleteDoc(doc(db, 'tasks', id));
	};

	const deleteCategory = async id => {
		await deleteDoc(doc(db, 'categories', id));

		tasks.forEach(task => {
			if (task.toCategory === id) {
				deleteTask(task.id);
			}
		});
	};

	const calcAllTasksInCategory = tasks => {
		let counter = 0;

		if (tasks.length > 0) {
			tasks.forEach(task => {
				counter++;
			});
			return counter;
		} else {
			return counter;
		}
	};

	const calcDoneTasksinCategory = tasks => {
		let counter = 0;

		tasks.forEach(task => {
			if (task.isDone) {
				counter++;
			}
		});
		return counter;
	};

	const allTaskToDoCounter = () => {
		let counter = 0;
		tasks.forEach(task => {
			if (!task.isDone) {
				counter++;
			}
		});
		return counter;
	};

	const dataContext = {
		activeIcon,
		toggleActiveIcon: () => {
			activeIcon !== 'tilesButton'
				? setActiveIcon('tilesButton')
				: setActiveIcon('squareButton');
		},
		translateValue,
		setTranslateValue,
		isDark,
		setIsDark,
		categoriesWithTasks,
		createCategory,
		deleteCategory,
		createTask,
		editTask,
		deleteTask,
		allTaskToDoCounter,
		tasks,
		calcAllTasksInCategory,
		calcDoneTasksinCategory,
	};

	return (
		<DataContext.Provider value={dataContext}>
			{props.children}
		</DataContext.Provider>
	);
};

export default DataProvider;
