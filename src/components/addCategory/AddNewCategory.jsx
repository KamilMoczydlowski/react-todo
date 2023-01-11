import { useContext, useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { collection, query, onSnapshot, doc } from 'firebase/firestore';

import { db } from '../../firebase';

import DataContext from '../../store/data-context';

import useHttp from '../../hooks/useHttp';

import Wrapper from '../layout/Wrapper';
import ColorCategoryItem from './ColorCategoryItem';
import TakeMeHomeButton from '../ui/btns/GoBackBtn';
import IconCategoryItem from './IconCategoryItem';
import SubmitBtnWithError from '../ui/btns/SubmitBtnWithError';

import styles from './AddNewCategory.module.css';
import colorStyles from './ColorCategoryItem.module.css';
import iconStyles from './IconCategoryItem.module.css';
import { useFirebase } from '../../hooks/useFirebase';

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

const AddNewCategory = () => {
	const [activeColorBtn, setActiveColorBtn] = useState();
	const [activeIconBtn, setActiveIconBtn] = useState();
	const [errorMsg, setErrorMsg] = useState('');
	const [inputValue, setInputValue] = useState();
	// const [fetchedIcons, setFetchedIcons] = useFirebase('icons', []);
	// const [fetchedColors, setFetchedColors] = useFirebase('colors', []);
	const [fetchedIcons, setFetchedIcons] = useState([]);
	const [fetchedColors, setFetchedColors] = useState([]);

	// console.log(useFirebase('icons')[0]);

	const getData = useHttp();

	const navigate = useNavigate();

	const dataCtx = useContext(DataContext);

	const createCategory = dataCtx.createCategory;

	const inputRef = useRef();

	useFirebase('icons', setFetchedIcons)
	useFirebase('colors', setFetchedColors)

	// useEffect(() => {
	// 	const q1 = query(collection(db, 'colors'));
	// 	const q2 = query(collection(db, 'icons'));

	// 	const unsub1 = onSnapshot(q1, querySnapshot => {
	// 		let colorsArr = [];
	// 		querySnapshot.forEach(doc => {
	// 			colorsArr.push({ ...doc.data(), id: doc.id });
	// 		});
	// 		setFetchedColors(colorsArr);
	// 	});
	// 	const unsub2 = onSnapshot(q2, querySnapshot => {
	// 		let iconsArr = [];
	// 		querySnapshot.forEach(doc => {
	// 			iconsArr.push({ ...doc.data(), id: doc.id });
	// 		});
	// 		setFetchedIcons(iconsArr);
	// 	});
	// 	return () => {
	// 		unsub1();
	// 		unsub2();
	// 	};
	// }, []);

	// useEffect(() => {
	// 	const transformData = obj => {
	// 		const iconArr = Object.entries(obj)[0][1];
	// 		const colorArr = Object.entries(obj)[1][1];

	// 		setFetchedIcons(iconArr);
	// 		setFetchedColors(colorArr);
	// 	};
	// 	getData(
	// 		{
	// 			url: 'https://react-todo-97328-default-rtdb.europe-west1.firebasedatabase.app/.json',
	// 		},
	// 		transformData
	// 	);
	// }, [getData]);

	// const colorArr = [
	// 	{ key: '#4BB1F8', color: '#4BB1F8' },
	// 	{ key: '#53DB89', color: '#53DB89' },
	// 	{ key: '#F98A4B', color: '#F98A4B' },
	// 	{ key: '#FF5E5E', color: '#FF5E5E' },
	// 	{ key: '#838FA4', color: '#838FA4' },
	// 	{ key: '#634BFA', color: '#634BFA' },
	// 	{ key: '#FC87E3', color: '#FC87E3' },
	// ];
	// const iconArr = [
	// 	{ key: 'burger', icon: '🍔' },
	// 	{ key: 'cake', icon: '🎂' },
	// 	{ key: 'chill', icon: '😎' },
	// 	{ key: 'cart', icon: '🛒' },
	// 	{ key: 'gift', icon: '🎁' },
	// 	{ key: 'soccer', icon: '⚽' },
	// 	{ key: 'diamond', icon: '💎' },
	// 	{ key: 'cup', icon: '🏆' },
	// 	{ key: 'red-note', icon: '📕' },
	// 	{ key: 'pill', icon: '💊' },
	// 	{ key: 'home', icon: '🏠' },
	// 	{ key: 'lock', icon: '🔏' },
	// 	{ key: 'case', icon: '💼' },
	// ];

	const activeColorHandler = e => {
		activeHandler(e, activeColorBtn, setActiveColorBtn, colorStyles.btnActive);
	};

	const activeIconHandler = e => {
		activeHandler(e, activeIconBtn, setActiveIconBtn, iconStyles.btnActive);
	};

	const addCategoryHandler = () => {
		setInputValue(inputRef.current.value);

		const prepTitle =
			inputRef.current.value.charAt(0).toUpperCase() +
			inputRef.current.value.slice(1).toLowerCase();

		if (
			inputRef.current.value.trim() !== '' &&
			activeColorBtn &&
			activeIconBtn
		) {
			setErrorMsg('');
			createCategory({
				title: prepTitle,
				color: activeColorBtn.id,
				icon: activeIconBtn.id,
			});

			setInputValue('');
			navigate('/addNewTask');
		} else if (inputRef.current.value.trim() === '') {
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
						<TakeMeHomeButton linkTo='/main' />
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
								value={inputValue}
								ref={inputRef}
								className={styles.textInput}
								placeholder='write category title'
							/>
						</div>
						<div className={styles.takeColorBox}>
							<p className={styles.label}>Choose color</p>
							<div className={styles.colorBox}>
								{fetchedColors.map(item => (
									<ColorCategoryItem
										key={item.id}
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
								{fetchedIcons.map(item => (
									<IconCategoryItem
										key={item.id}
										id={item.icon}
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
