import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TAB_SELECTOR, TYPE_INGREDIENT } from './../../consts'

import navStyles from './Nav.module.css'

Nav.propTypes = {
    currentTab: PropTypes.string
}

export default function Nav({currentTab}) {
    const onSwitchTab = (ref) => {
        document.querySelector(`[${TAB_SELECTOR.slice(1,-1)}="${ref}"]`).scrollIntoView({
            behavior: "smooth"
        })
    }

    return <div className={navStyles.tabs_container}>
    <Tab value={TYPE_INGREDIENT[0].param}
        active={currentTab === TYPE_INGREDIENT[0].param}
        onClick={() => onSwitchTab(TYPE_INGREDIENT[0].param)}
    >
        {TYPE_INGREDIENT[0].title}
    </Tab>

    <Tab value={TYPE_INGREDIENT[1].param}
     active={currentTab === TYPE_INGREDIENT[1].param}
     onClick={() => onSwitchTab(TYPE_INGREDIENT[1].param)}
    >
        {TYPE_INGREDIENT[1].title}
    </Tab>

    <Tab value={TYPE_INGREDIENT[2].param}
     active={currentTab === TYPE_INGREDIENT[2].param}
     onClick={() => onSwitchTab(TYPE_INGREDIENT[2].param)}
    >
        {TYPE_INGREDIENT[2].title}
    </Tab>
    </div>
}