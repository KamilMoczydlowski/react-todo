import CategoryCardSmall from './CategoryCardSmall';
import AddNewTaskBtn from '../ui/btns/AddNewTaskBtn';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import styles from './SmallCardBox.module.css';

const SmallCardBox = props => {
	const translateValue = props.context.translateValue;
	const setTranslateValue = props.context.setTranslateValue;

	const arrCategories = props.arrCategories;

	const cards = arrCategories.map(cat => (
		<div key={cat.id} className={styles.carouselItem}>
			<CategoryCardSmall
				key={cat.id}
				id={cat.id}
				bgc={cat.color}
				icon={cat.icon}
				title={cat.title}
				context={props.context}
				allTasksCounter={props.context.calcAllTasksInCategory}
				tasksDoneCounter={props.context.calcDoneTasksinCategory}
				tasks={cat.filteredTasks}
			/>
		</div>
	));

	const categoriesArrLength = arrCategories.length;

	const carouselToLeft = () => {
		let newVal = translateValue - 1;

		if (newVal >= 0) {
			setTranslateValue(newVal);
		} else {
			setTranslateValue(categoriesArrLength - 1);
		}
	};

	const carouselToRight = () => {
		let newVal = translateValue + 1;

		if (newVal < categoriesArrLength) {
			setTranslateValue(newVal);
		} else {
			setTranslateValue(0);
		}
	};

	return (
		<div className={styles.smallCardContainer}>
			<div className={styles.carouselBox}>
				<div className={styles.carousel}>
					<div
						className={styles.carouselCards}
						style={{ transform: `translateX(-${translateValue}00%)` }}>
						{cards}
					</div>
				</div>
				<button className={styles.arrowBtnLeft} onClick={carouselToLeft}>
					<FaAngleLeft />
				</button>
				<button className={styles.arrowBtnRight} onClick={carouselToRight}>
					<FaAngleRight />
				</button>
			</div>
			<div className={styles.btnBox}>
				<AddNewTaskBtn
					categoriesLength={categoriesArrLength}
					cssStyle={styles.addTaskBtn}
				/>
			</div>
		</div>
	);
};

export default SmallCardBox;
