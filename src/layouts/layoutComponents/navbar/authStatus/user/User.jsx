import React, { useEffect } from 'react'
import styles from '../../Navbar.module.scss'
import UserNavigation from '../../../navigation/userNavigation/UserNavigation'
import $api from '../../../../../http'

const User = ({ view, setView, setUser }) => {
    useEffect(() => {
        document.addEventListener('click', () => {
            setView(false)
        })
        return document.removeEventListener('click', () => {
            setView(false)
        })
    })
    const actions = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setView(true)
    }
    const logout = async () => {
        await $api.post('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        setUser(false)
    }

    return (
        <div className={styles.btnSection}>
            <button className={styles.userImg} onClick={actions}>
                {localStorage.getItem('name')
                    ? localStorage.getItem('name')[0]
                    : ''}
            </button>
            <UserNavigation view={view} setView={setView} logout={logout} />
        </div>
    )
}

export default User
