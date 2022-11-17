import styles from './CategoryCardSmall.module.css';

const CategoryCardSmall = props => {
	<div
		className={styles.smallCard}
		style={{ backgroundColor: props.background }}
        onClick={props.onClick}>
            <div className={styles.header}></div>
        </div>;
};

export default CategoryCardSmall;
