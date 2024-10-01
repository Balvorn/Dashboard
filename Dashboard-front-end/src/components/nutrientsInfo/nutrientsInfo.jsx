import styles from "./nutrientsInfo.module.css"

export default function NutrientsInfo({ url, data, color }) {
    return (
        <li className={styles.li}>
            <img src={url} style={{ backgroundColor: color }} alt="icon" />
            <div>
                <div className={styles.amount}>{data[1]}</div>
                <div className={styles.unit}>{data[0]}</div>
            </div>

        </li>
    )
}