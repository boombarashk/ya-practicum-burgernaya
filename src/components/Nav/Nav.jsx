import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TABS } from './../../consts'

import navStyles from './Nav.module.css'

export default function Nav() {
    const [currentTab, setCurrentTab] = useState('bread')

    return <div className={navStyles.tabs_container}>
    <Tab value={TABS[0].value}
        active={currentTab === TABS[0].value}
        onClick={() => setCurrentTab(TABS[0].value)}
    >
        {TABS[0].label}
    </Tab>

    <Tab value={TABS[1].value}
     active={currentTab === TABS[1].value}
     onClick={() => setCurrentTab(TABS[1].value)}
    >
        {TABS[1].label}
    </Tab>

    <Tab value={TABS[2].value}
     active={currentTab === TABS[2].value}
     onClick={() => setCurrentTab(TABS[2].value)}
    >
        {TABS[2].label}
    </Tab>
    </div>
}