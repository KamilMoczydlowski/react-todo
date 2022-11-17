// import { useContext } from 'react';

import CategoryCardSmall from './CategoryCardSmall';

// import TaskContext from '../store/task-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from 'fontawesome.macro';

import styles from './SmallCardBox.module.css';

const SmallCardBox = props => {
	// let doneTask = 0;

	// const taskCtx = useContext(TaskContext);

	return (
		<div className={styles.smallCardContainer}>
			<div id='carousel-indicators' className={styles.carousel}>
				<div className={styles.carouselCards}>
                    <div className={styles.carouselItem}>
                        <CategoryCardSmall onClick={props.onClick} />
                    </div>
                </div>
				<a
					className='carousel-control-prev'
					href='#carouselExampleIndicators'
					role='button'
					data-slide='prev'>
					<span
						className='carousel-control-prev-icon'
						aria-hidden='true'></span>
				</a>
				<a
					className='carousel-control-next'
					href='#carouselExampleIndicators'
					role='button'
					data-slide='next'>
					<span
						className='carousel-control-next-icon'
						aria-hidden='true'></span>
				</a>
				<ol className={styles.indicators}>
					<li className={styles.indicator}></li>
					<li className={styles.indicator}></li>
					<li className={styles.indicator}></li>
					<li className={styles.indicator}></li>
					<li className={styles.indicator}></li>
				</ol>
			</div>
			<div className={styles.btnBox}>
				<button className={styles.addCategoryBtn}>
					<FontAwesomeIcon icon={fas('plus')} />
				</button>
			</div>
		</div>
	);
};

export default SmallCardBox;

// {taskCtx.categories.map(item => {
//     doneTask = 0;

//     item.tasks.forEach(task => {
//         if (task.isDone) {
//             doneTask++;
//         }
//     });

//     return (
//         <CategoryCardSmall
//             key={item.id}
//             id={item.id}
//             icon={item.icon}
//             title={item.id}
//             doneTasks={doneTask}
//             allTasks={item.tasks.length}
//             background={item.color}
//             onClick={showBigCardHandler}
//         />
//     );
// })}
