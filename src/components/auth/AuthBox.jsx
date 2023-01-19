import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import useAuthInput from '../../hooks/useAuthInput';

import ErrorPopup from '../ui/popups/ErrorPopup';

import styles from './AuthBox.module.css';

const AuthBox = () => {

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangedHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
	} = useAuthInput(value => {
		return value.match(
			/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	});

	const {
		value: enteredPassword,
		isValid: passwordIsValid,
		hasError: passwordInputHasError,
		valueChangeHandler: passwordChangedHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPasswordInput,
	} = useAuthInput(value => {
		return value.match(/^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,}$/);
	});

	const [isLogin, setIsLogin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorPopupMsg, setErrorPopupMsg] = useState(false);

	const navigate = useNavigate();

	const authCtx = useContext(AuthContext);

	const switchAuthHandler = () => {
		setIsLogin(prevState => !prevState);
	};

	const getNameFromEmailHandler = email => {
		const indexAt = email.indexOf('@');
		const cutName = email.slice(0, indexAt);
		let prepName;

		if (cutName.includes('.')) {
			const indexDot = email.indexOf('.');
			prepName =
				email.charAt(0).toUpperCase() +
				email.slice(1, indexDot) +
				' ' +
				email.charAt(indexDot + 1).toUpperCase() +
				email.slice(indexDot + 2, indexAt);
		} else {
			prepName = cutName.charAt(0).toUpperCase() + cutName.slice(1);
		}

		localStorage.setItem('userName', prepName);
	};

	let formIsValid = false;

	if (emailIsValid && passwordIsValid) {
		formIsValid = true;
	}

	const submitHandler = e => {
		e.preventDefault();

		// if (!emailIsValid || !passwordIsValid) {
		// 	return;
		// }

		setIsLoading(true);

		const API_KEY = process.env.REACT_APP_API_KEY;

		let url;

		if (isLogin) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
		} else {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
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
				authCtx.login(data.idToken, expTime.toISOString()); // expTime passing as obj, turning into string
				getNameFromEmailHandler(enteredEmail);
				navigate('/main', { replace: true }); // redirect to new page without ability to click back btn to return on login page
			})
			.catch(err => {
				const error = err.message;
				let errorMessage;

				console.log(error);

				if (error.includes('EMAIL_EXISTS')) {
					errorMessage = 'This email is already in use.';
				} else if (error.includes('WEAK_PASSWORD')) {
					errorMessage = 'Password should be at least 6 characters';
				} else if (error.includes('INVALID_PASSWORD')) {
					errorMessage = 'This password is invalid';
					resetPasswordInput();
				} else if (error.includes('EMAIL_NOT_FOUND')) {
					errorMessage = "I can't find a user with matching email";
					resetEmailInput();
				} else if (error.includes('TOO_MANY_ATTEMPS_TRY_LATER')) {
					errorMessage = "I believe you will remember your email and password, but for now take a pause and return later";
					resetEmailInput();
				} else {
					// errorMessage = err.message;
					errorMessage =
						'Something went horribly wrong, please contact the developer.';
				}

				setErrorPopupMsg(errorMessage);
			});

		// resetEmailInput();
		// resetPasswordInput();
	};

	return (
		<>
			<div className={styles.authBox}>
				<h3 className={styles.authTitle}>{!isLogin ? 'Sign Up' : 'Login'}</h3>
				<form className={styles.form} onSubmit={submitHandler} noValidate>
					<label htmlFor='auth-email' className={styles.label}>
						Email:
					</label>
					<input
						id='auth-email'
						className={
							!emailInputHasError
								? styles.input
								: `${styles.input} ${styles.inputError}`
						}
						type='email'
						placeholder='Write your email here'
						onChange={emailChangedHandler}
						onBlur={emailBlurHandler}
						required
					/>
					{emailInputHasError && (
						<p className={styles.formError}>Enter valid email address</p>
					)}
					<label htmlFor='auth-password' className={styles.label}>
						Password:
					</label>
					<input
						id='auth-password'
						className={
							!passwordInputHasError
								? styles.input
								: `${styles.input} ${styles.inputError}`
						}
						type='password'
						placeholder='Write your password here'
						onChange={passwordChangedHandler}
						onBlur={passwordBlurHandler}
						required
					/>
					{passwordInputHasError && (
						<p className={styles.formError}>
							Password should contains big and small letters, number, special
							character and be 6 characters long
						</p>
					)}
					<button className={styles.actionBtn} disabled={!formIsValid}>
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
			{errorPopupMsg && (
				<ErrorPopup errorMsg={errorPopupMsg} closeModal={setErrorPopupMsg} />
			)}
		</>
	);
};

export default AuthBox;
