import React from 'react';

const DataContext = React.createContext({
	userName: '',
	getUserName: () => {},
	categories: [],
	activeIcon: '',
	toggleActiveIcon: () => {},
	translateValue: 0,
	setTranslateValue: () => {},
	isDark: false,
	setIsDark: () => {},
});

export default DataContext;
