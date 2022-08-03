import React from 'react'
import styles from '../LoginModal.module.scss'
import ReCAPTCHA from 'react-google-recaptcha'
const Recaptcha = ({ change, refTo }) => {
    const key = '6Lcdaz4hAAAAABUQN2vuYTnGhZ7qQOKGJZRCgMpd'
    return (
        <div className={styles.recaptcha}>
            <ReCAPTCHA sitekey={key} onChange={change} ref={refTo} />
        </div>
    )
}

export default Recaptcha
