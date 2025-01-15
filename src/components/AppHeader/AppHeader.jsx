import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

export default function AppHeader() {
    return (<header>
    <div className={styles.header_container}>
        <nav className={styles.nav}>
            <ul>
                <li key={'base-page'} className="active">
                    <BurgerIcon />
                    Конструктор
                </li>
                <li key={'ribbon-page'} className="inactive text_color_inactive">
                    <ListIcon type="secondary"/>
                    Лента заказов
                </li>
            </ul>
        </nav>

        <div className={styles.header_logo}><Logo /></div>

        <div className={styles.header_auth_link}>
            <ProfileIcon />
            Личный кабинет
        </div>
    </div>
    </header>)
}