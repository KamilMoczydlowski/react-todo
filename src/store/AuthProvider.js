import { useState, useEffect, useCallback } from 'react';
import AuthContext from './auth-context';

let logoutTimer;

const calcRemainingTime = expirationTime => {
	const currentTime = new Date().getTime();
	const adjExpTime = new Date(expirationTime).getTime(); //  from passed obj getting value with getTime, it represents some time in the future in ms

	const remainingDuration = adjExpTime - currentTime;

	return remainingDuration;
};

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpDate = localStorage.getItem('expTime');

	const remainingTime = calcRemainingTime(storedExpDate);

	if (remainingTime <= 60000) {
		localStorage.removeItem('token');
		localStorage.removeItem('expTime');
		return null;
	}

	return { token: storedToken, duration: remainingTime };
};

const AuthProvider = props => {
	const tokenData = retrieveStoredToken();

	let initialToken;

	if (tokenData) {
		initialToken = tokenData.token;
	}

	const [token, setToken] = useState(initialToken);

	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		localStorage.removeItem('expTime');

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (token, expirationTime) => {
		setToken(token);

		localStorage.setItem('token', token);
		localStorage.setItem('expTime', expirationTime);

		const remainingTime = calcRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [tokenData, logoutHandler]);

	const authContext = {
		token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={authContext}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
