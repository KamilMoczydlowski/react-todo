import { useContext, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthContext from '../store/auth-context';
import DataContext from '../store/data-context';

import styles from './AuthBox.module.css';
import ErrorPopup from './ErrorPopup';

const AuthBox = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const navigate = useNavigate();

	const authCtx = useContext(AuthContext);
	const dataCtx = useContext(DataContext);

	const switchAuthHandler = () => {
		setIsLogin(prevState => !prevState);
	};

	const submitHandler = e => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// need validation of inputs

		setIsLoading(true);

		let url;

		if (isLogin) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWNNfUdbytzdwPt5jwCNYmfZ1MDcrOT10';
		} else {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWNNfUdbytzdwPt5jwCNYmfZ1MDcrOT10';
		}

		// here we can also use custom hooks

		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken: true,
			}),
			headers: {
				'Content-Type': 'application/json', // added to ensure that auth REST API knows that we post json data
			},
		})
			.then(res => {
				setIsLoading(false);

				if (res.ok) {
					return res.json();
				} else {
					return res.json().then(data => {
						let errorText = 'Authentication failed!';

						if (data && data.error && data.error.message) {
							errorText = data.error.message;
						}

						throw new Error(errorText);
					});
				}
			})
			.then(data => {
				const expTime = new Date(new Date().getTime() + +data.expiresIn * 1000); // creating new date obj passing current time plus number of seconds for token expire
				authCtx.login(data.idToken, expTime.toISOString()); // expTime passing as obj
				dataCtx.getUserName(enteredEmail);
				navigate('/main', { replace: true }); // redirect to new page without ability to click back btn to return on login page
			})
			.catch(err => {
				console.log(err);
				const error = err.message;
				let errorMessage;

				if (error.includes('EMAIL_EXISTS')) {
					errorMessage = 'This email is already in use.';
				} else if (error.includes('WEAK_PASSWORD')) {
					errorMessage = 'Password should be at least 6 characters';
				} else if (error.includes('INVALID_PASSWORD')) {
					errorMessage = 'This password is invalid';
				} else if (error.includes('EMAIL_NOT_FOUND')) {
					errorMessage = "I can't find a user with matching email";
				} else {
					// errorMessage = err.message;
					errorMessage = 'Something went horribly wrong, please contact the developer.';
				}

				setErrorMsg(errorMessage);
			});
	};

	return (
		<>
			<div className={styles.authBox}>
				<h3 className={styles.authTitle}>{!isLogin ? 'Sign Up' : 'Login'}</h3>
				<form className={styles.form} onSubmit={submitHandler}>
					<label htmlFor='auth-email' className={styles.label}>
						Email:
					</label>
					<input
						id='auth-email'
						className={styles.input}
						type='email'
						placeholder='Write your email here'
						required
						ref={emailInputRef}
					/>
					<label htmlFor='auth-password' className={styles.label}>
						Password:
					</label>
					<input
						id='auth-password'
						className={styles.input}
						type='password'
						placeholder='Write your password here'
						required
						ref={passwordInputRef}
					/>

					<button className={styles.actionBtn}>
						{!isLoading
							? !isLogin
								? 'Sign Up'
								: 'Login'
							: 'Sending request...'}
					</button>
				</form>
				<button className={styles.changeAuthBtn} onClick={switchAuthHandler}>
					{!isLogin
						? 'Login with existing account'
						: 'Sign Up to create new account '}
				</button>
			</div>
			{errorMsg && <ErrorPopup errorMsg={errorMsg} closeModal={setErrorMsg} />}
		</>
	);
};

export default AuthBox;
