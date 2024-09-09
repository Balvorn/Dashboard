import styles from "./nav.module.css"
import logo from "../../assets/logo.svg"
import cyclism from "../../assets/cyclism.svg"
import yoga from "../../assets/yoga.svg"
import swimming from "../../assets/swimming.svg"
import weight from "../../assets/weight.svg"
import NavIcon from "../nav-icon/nav-icon"

const navImgs = [yoga,cyclism,swimming,weight]
export default function Nav() {
    console.log(navImgs)
    return (
        <>
            <header className={styles.header}>
                <div>
                    <img src={logo} alt="logo" />
                    <h1>SportSee</h1>
                </div>

                <nav>
                    <ul>
                        <li  className="red">
                            <a href="#">Accueil</a>
                        </li>
                        <li>
                            <a href="#">Profil</a>
                        </li>
                        <li>
                            <a href="#">Réglage</a>
                        </li>
                        <li>
                            <a href="#">Communauté</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <nav className={styles.vertical}>
                <ul>
                    {navImgs.map(navImg => {
                       return <NavIcon url={navImg}></NavIcon>
                    })
                }
                </ul>
                <small>Copiryght, SportSee 2020</small>
            </nav>
        </>

    )
}