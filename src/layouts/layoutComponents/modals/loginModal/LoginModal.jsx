import React, { useRef, useState } from 'react'
import AuthModal from '../../../../components/ui/modals/authModal/AuthModal'
import styles from './LoginModal.module.scss'
import Recaptcha from './recaptcha/Recaptcha'
import { toast } from 'react-toastify'
import $api from '../../../../http'
import Google from './authSocial/auth/Google'
import Facebook from './authSocial/auth/Facebook'
import Agreement from '../../../../components/agreement/Agreement'

const LoginModal = ({ open, setOpen, setStep, setExist, setSc }) => {
    const [verified, setVerified] = useState(false)
    const [key, setKey] = useState('')
    const phoneRef = useRef()
    const recaptchaRef = useRef()
    const handleLogin = async (e) => {
        e.preventDefault()
        if (!phoneRef.current.value) {
            toast.warn('Phone input must be filled out')
        }
        if (!verified) {
            toast.warn('Verify recaptcha')
        }
        await $api
            .post('http://192.168.202.52/api/phone', {
                phone: `+994${phoneRef.current.value}`,
                reKey: key,
            })
            .then((res) => {
                if (res.status === 201) {
                    if (res.data.recaptcha) {
                        sessionStorage.setItem(
                            'phone',
                            `+994${phoneRef.current.value}`
                        )
                        if (res.data.status === 1) {
                            sessionStorage.setItem('name', res.data.name)
                            setExist(true)
                        }
                        setStep(true)
                        setSc(false)
                    } else {
                        toast.error('Verify recaptcha')
                        recaptchaRef.current.reset()
                    }
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    toast.error(`User blocked for ${err.response.data.time}h `)
                }
            })
    }

    const change = (res) => {
        setVerified(true)
        setKey(res)
    }

    return (
        <AuthModal open={open} setOpen={setOpen} setStep={setStep}>
            <h1 className={styles.loginTitle}>Login to Fooderos</h1>
            <div>
                <p className={styles.loginContent}>Enter your phone number</p>
                <div className={styles.input}>
                    <span className={styles.cc}>+994</span>
                    <span className={styles.inputContainer}>
                        <input
                            type={'text'}
                            className={styles.phoneInput}
                            placeholder={'775105005'}
                            ref={phoneRef}
                        />
                    </span>
                </div>
                <Recaptcha change={change} refTo={recaptchaRef} />
                <button className={styles.loginButton} onClick={handleLogin}>
                    Continue
                </button>
            </div>
            <div className={styles.divider}>or</div>
            <div className={styles.sc}>
                <Google setSc={setSc} setStep={setStep} />
                <Facebook setSc={setSc} />
            </div>
            <Agreement />
        </AuthModal>
    )
}

export default LoginModal
