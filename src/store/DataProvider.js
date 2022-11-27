import { useState } from 'react';
import DataContext from './data-context';

import useFetchedData from '../components/useFetchedData';

const DataProvider = props => {
	const initialName = localStorage.getItem('userName')
	const [userName, setUserName] = useState(initialName); // set from 'WelcomeContent.jsx'
	const [activeIcon, setActiveIcon] = useState('tilesButton'); // 'tilesButton' or 'squareButton' set from 'MainContent.jsx'
	const [translateValue, setTranslateValue] = useState(0); // set from 'SmallCardBox.jsx'
	const [isDark, setIsDark] = useState(false); // set from 'MenuBox.jsx'

	const getNameFromEmailHandler = (email) => {
		const index = email.indexOf('@')
		const cutName = email.slice(0, index)
		setUserName(cutName)
		localStorage.setItem('userName', cutName)
	}

	const dataContext = {
		userName,
		getUserName: getNameFromEmailHandler,
		categories: useFetchedData(),
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
	};

	return (
		<DataContext.Provider value={dataContext}>
			{props.children}
		</DataContext.Provider>
	);
};

export default DataProvider;
