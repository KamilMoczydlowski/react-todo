import { useState, useRef } from 'react';

import styles from './AddNewCategory.module.css';
import colorStyles from './ColorCategoryItem.module.css';
import iconStyles from './IconCategoryItem.module.css';

import ColorCategoryItem from './ColorCategoryItem';
import TakeMeHomeButton from './GoBackBtn';
import IconCategoryItem from './IconCategoryItem';
import Wrapper from './Wrapper';
import SubmitBtnWithError from './SubmitBtnWithError';

export const activeHandler = (e, state, setState, classActive) => {
	if (state) {
		state.classList.remove(classActive);
		e.target.closest('button').classList.add(classActive);
		setState(e.target.closest('button'));
	} else if (e.target.closest('button').classList.contains(classActive)) {
		e.target.closest('button').classList.remove(classActive);
		setState();
	} else {
		e.target.closest('button').classList.add(classActive);
		setState(e.target.closest('button'));
	}
};

const AddNewCategory = props => {
	const [activeColorBtn, setActiveColorBtn] = useState();
	const [activeIconBtn, setActiveIconBtn] = useState();
	const [errorMsg, setErrorMsg] = useState('');

	const inputValue = useRef();

	const colorArr = [
		{ key: '#4BB1F8', color: '#4BB1F8' },
		{ key: '#53DB89', color: '#53DB89' },
		{ key: '#F98A4B', color: '#F98A4B' },
		{ key: '#FF5E5E', color: '#FF5E5E' },
		{ key: '#838FA4', color: '#838FA4' },
		{ key: '#634BFA', color: '#634BFA' },
		{ key: '#FC87E3', color: '#FC87E3' },
	];
	const iconArr = [
		{ key: 'burger', icon: '🍔' },
		{ key: 'cake', icon: '🎂' },
		{ key: 'chill', icon: '😎' },
		{ key: 'cart', icon: '🛒' },
		{ key: 'gift', icon: '🎁' },
		{ key: 'soccer', icon: '⚽' },
		{ key: 'diamond', icon: '💎' },
		{ key: 'cup', icon: '🏆' },
		{ key: 'red-note', icon: '📕' },
		{ key: 'pill', icon: '💊' },
		{ key: 'home', icon: '🏠' },
		{ key: 'lock', icon: '🔏' },
		{ key: 'case', icon: '💼' },
	];

	const activeColorHandler = e => {
		activeHandler(e, activeColorBtn, setActiveColorBtn, colorStyles.btnActive);
		// if (activeColorBtn) {
		// 	activeColorBtn.classList.remove(colorStyles.btnActive);
		// 	e.target.closest('button').classList.add(colorStyles.btnActive);
		// 	setActiveColorBtn(e.target.closest('button'));
		// } else if (
		// 	e.target.closest('button').classList.contains(colorStyles.btnActive)
		// ) {
		// 	e.target.closest('button').classList.remove(colorStyles.btnActive);
		// 	setActiveColorBtn();
		// } else {
		// 	e.target.closest('button').classList.add(colorStyles.btnActive);
		// 	setActiveColorBtn(e.target.closest('button'));
		// }
	};

	const activeIconHandler = e => {
		activeHandler(e, activeIconBtn, setActiveIconBtn, iconStyles.btnActive);
		// if (activeIconBtn) {
		// 	activeIconBtn.classList.remove(iconStyles.btnActive);
		// 	e.target.closest('button').classList.add(iconStyles.btnActive);
		// 	setActiveIconBtn(e.target.closest('button'));
		// } else if (
		// 	e.target.closest('button').classList.contains(iconStyles.btnActive)
		// ) {
		// 	e.target.closest('button').classList.remove(iconStyles.btnActive);
		// 	setActiveIconBtn();
		// } else {
		// 	e.target.closest('button').classList.add(iconStyles.btnActive);
		// 	setActiveIconBtn(e.target.closest('button'));
		// }
	};

	const addCategoryHandler = () => {
		if (inputValue.current.value !== '' && activeColorBtn && activeIconBtn) {
			setErrorMsg('');
			console.log(inputValue.current.value);
			console.log(activeColorBtn.id);
			console.log(activeIconBtn.id);
			inputValue.current.value = '';
		} else if (inputValue.current.value === '') {
			setErrorMsg('invalid input!');
		} else if (!activeColorBtn) {
			setErrorMsg('choose color!');
		} else {
			setErrorMsg('choose icon!');
		}
	};

	return (
		<div className={styles.background}>
			<Wrapper>
				<div className={styles.container}>
					<div className={styles.titleBox}>
						<TakeMeHomeButton linkTo='/addNewTask' />
						<h2 className={styles.title}>Add new category</h2>
					</div>
					<div className={styles.content}>
						<div className={styles.inputBox}>
							<label htmlFor='input-title' className={styles.label}>
								Category Title
							</label>
							<input
								type='text'
								id='input-title'
								ref={inputValue}
								className={styles.textInput}
								placeholder='write title'
							/>
						</div>
						<div className={styles.takeColorBox}>
							<p className={styles.label}>Choose color</p>
							<div className={styles.colorBox}>
								{colorArr.map(item => (
									<ColorCategoryItem
										key={item.key}
										id={item.key}
										background={item.color}
										onClick={activeColorHandler}
									/>
								))}
							</div>
						</div>
						<div className={styles.takeIconBox}>
							<p className={styles.label}>Choose icon</p>
							<div className={styles.iconBox}>
								{iconArr.map(item => (
									<IconCategoryItem
										key={item.key}
										id={item.key}
										icon={item.icon}
										onClick={activeIconHandler}
									/>
								))}
							</div>
						</div>
					</div>
						<SubmitBtnWithError
							onClick={addCategoryHandler}
							text={'Done!'}
							error={errorMsg}
						/>
				</div>
			</Wrapper>
		</div>
	);
};

export default AddNewCategory;
