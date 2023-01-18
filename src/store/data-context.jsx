import React from 'react';

const DataContext = React.createContext({
	activeIcon: '',
	toggleActiveIcon: () => {},
	translateValue: 0,
	setTranslateValue: () => {},
	isDark: false,
	setIsDark: () => {},
	categoriesWithTasks: {},
	createCategory: () => {},
	deleteCategory: () => {},
	createTask: () => {},
	editTask: () => {},
	deleteTask: () => {},
	allTaskToDoCounter: () => {},
	tasks: [],
	calcAllTasksInCategory: () => {},
	calcDoneTasksinCategory: () => {}
});

export default DataContext;
