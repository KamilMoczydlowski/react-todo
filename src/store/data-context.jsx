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
	allTaskCounter: () => {},
	tasks: [],
	calcAllTasksInCategory: () => {},
	calcDoneTasksinCategory: () => {}
});

export default DataContext;
