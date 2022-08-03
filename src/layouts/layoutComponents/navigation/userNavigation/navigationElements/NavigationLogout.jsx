import styles from '../UserNavigation.module.scss'
const NavigationLogout = ({ logout }) => {
    return (
        <div
            onClick={logout}
            className={styles.navElement + ' ' + 'text-orange-500'}
        >
            Logout
        </div>
    )
}

export default NavigationLogout
