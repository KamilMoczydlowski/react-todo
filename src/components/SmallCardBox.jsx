import { useContext } from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import CategoryCardSmall from './CategoryCardSmall';
import AddNewTaskBtn from './AddNewTaskBtn';

import DataContext from '../store/data-context';

import styles from './SmallCardBox.module.css';

const SmallCardBox = () => {
	const dataCtx = useContext(DataContext);

	const cards = dataCtx.categories.map(cat => (
		<div key={cat.key} className={styles.carouselItem}>
			<CategoryCardSmall
				key={cat.key}
				bgc={cat.color}
				icon={cat.icon}
				title={cat.id}
				allTasksCounter={cat.allTasks}
				tasksDoneCounter={cat.tasksDone}
				tasks={cat.tasks}
			/>
		</div>
	));

	const carouselToLeft = () => {
		let newVal = dataCtx.translateValue - 1;

		if (newVal >= 0) {
			dataCtx.setTranslateValue(newVal);
		} else {
			dataCtx.setTranslateValue(dataCtx.categories.length - 1);
		}
	};

	const carouselToRight = () => {
		let newVal = dataCtx.translateValue + 1;

		if (newVal < dataCtx.categories.length) {
			dataCtx.setTranslateValue(newVal);
		} else {
			dataCtx.setTranslateValue(0);
		}
	};

	return (
		<div className={styles.smallCardContainer}>
			<div className={styles.carouselBox}>
				<div className={styles.carousel}>
					<div
						className={styles.carouselCards}
						style={{ transform: `translateX(-${dataCtx.translateValue}00%)` }}>
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
				<AddNewTaskBtn cssStyle={styles.addTaskBtn} />
			</div>
		</div>
	);
};

export default SmallCardBox;
