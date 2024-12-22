import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './AppHeader.css';

export default function AppHeader() {
    return <>
    <div className="header-container">
        <nav>
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

        <div className="header-logo"><Logo /></div>

        <div className="header-auth-link">
            <ProfileIcon />
            Личный кабинет
        </div>
    </div>
    </>
}