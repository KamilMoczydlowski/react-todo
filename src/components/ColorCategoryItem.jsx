import styles from './ColorCategoryItem.module.css'

const ColorCategoryItem = (props) => {
    return (
        <button id={props.id} className={styles.btn} onClick={props.onClick}>
            <div className={styles.colorTile} style={{backgroundColor: props.background}}></div>
        </button>
    )
}

export default ColorCategoryItem