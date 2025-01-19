import loader from '../../images/icons8-loading-40.png'
import styles from './Loader.module.css'

export default function Loader(){
    return <div className={styles.loader}>
        <img src={loader} alt="Загрузка.."/>
    </div>
}