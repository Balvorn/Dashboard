import styles from "./navIcon.module.css"

export default function NavIcon({url}) {
    return (
        <li className={styles.li}>
            <a href="#">
                <img src={url} alt="" />
            </a>
        </li>
    )
}