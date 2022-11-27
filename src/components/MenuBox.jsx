import { useContext, useRef } from 'react';

import CSSTransition from 'react-transition-group/CSSTransition';

// needed for theme
// import DataContext from '../store/data-context';

//needed for theme
// import { FaSun, FaMoon } from 'react-icons/fa'; 

import styles from './MenuBox.module.css';
import AuthContext from '../store/auth-context';

const animationTiming = {
	enter: 300,
	exit: 300,
};

const MenuBox = props => {
	// needed for theme
	// const dataCtx = useContext(DataContext);
	const authCtx = useContext(AuthContext);

	const nodeRef = useRef(null);

	// needed for theme
	// const changeModeHandler = e => {
	// 	if (!dataCtx.isDark) {
	// 		dataCtx.setIsDark(true);
	// 	} else {
	// 		dataCtx.setIsDark(false);
	// 	}
	// };

	const logoutHandler = () => {
		authCtx.logout();
		props.showMenu(false);
	};

	return (
		<CSSTransition
			nodeRef={nodeRef}
			in={props.show}
			timeout={animationTiming}
			mountOnEnter
			unmountOnExit
			classNames={{
				enter: '',
				enterActive: styles.showMenuBox,
				exit: '',
				exitActive: styles.hideMenuBox,
			}}>
			<div ref={nodeRef} className={styles.menuBox}>
				{/* theme will be add in the future patch */}
				{/* <button className={styles.menuBtn} onClick={changeModeHandler}>
					Mode: {!dataCtx.isDark ? <FaSun /> : <FaMoon />}
				</button> */} 
				<button className={styles.menuBtn} onClick={logoutHandler}>
					Logout
				</button>
			</div>
		</CSSTransition>
	);
};

export default MenuBox;
