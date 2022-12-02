import { useState, useMemo } from 'react';

import DataContext from './data-context';

import { useLocalStorage } from '../hooks/useLocalStorage';

import { v4 as uuidV4 } from 'uuid';

const DataProvider = props => {
	const [activeIcon, setActiveIcon] = useState('tilesButton'); // 'tilesButton' or 'squareButton' set from 'MainContent.jsx'
	const [translateValue, setTranslateValue] = useState(0); // set from 'SmallCardBox.jsx'
	const [isDark, setIsDark] = useState(false); // set from 'MenuBox.jsx'

	const [categories, setCategories] = useLocalStorage('CATEGORIES', []);
	const [tasks, setTasks] = useLocalStorage('TASKS', []);

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

	const createCategory = ({ ...data }) => {
		setCategories(prevCategories => {
			return [...prevCategories, { ...data, id: uuidV4() }];
		});
	};

	const createTask = ({ ...data }) => {
		setTasks(prevTasks => {
			return [...prevTasks, { ...data, id: uuidV4() }];
		});
	};

	const editTask = (id, { ...data }) => {
		setTasks(prevTasks => {
			return prevTasks.map(task => {
				if (task.id === id) {
					return { ...task, ...data };
				} else {
					return task;
				}
			});
		});
	};

	const deleteTask = (id) => {
		setTasks(prevTasks => {
			return prevTasks.filter( task => task.id !== id )
		})
	}

	const deleteCategory = id => {
		setCategories(prevCategories => {
			return prevCategories.filter(category => category.id !== id)
		})

		setTasks(prevTasks => {
			return prevTasks.filter( task => task.toCategory !== id )
		})
	}

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

	const allTaskCounter = () => {
		let counter = 0;
		tasks.forEach(task => {
			counter++;
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
		allTaskCounter,
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
