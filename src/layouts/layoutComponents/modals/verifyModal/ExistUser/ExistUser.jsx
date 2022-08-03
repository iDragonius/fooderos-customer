import React, { useState, useEffect, useRef } from 'react'
import styles from '../VerifyModal.module.scss'
import axios from 'axios'
import { toast } from 'react-toastify'
const ExistUser = ({ setStep, step, setOpen }) => {
    const [seconds, setSeconds] = useState()
    const [minutes, setMinutes] = useState()
    const otpRef = useRef()
    let timer
    useEffect(() => {
        if (step) {
            setSeconds(0)
            setMinutes(3)
        }
    }, [step])

    useEffect(() => {
        if (seconds === 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
        }
        if (minutes === 0 && seconds === 0) {
            setStep(false)
        }
        timer = setInterval(() => {
            setSeconds(seconds - 1)
        }, 1000)

        return () => clearInterval(timer)
    })

    const handleVerify = async (e) => {
        e.preventDefault()
        await axios
            .post('http://192.168.202.52/api/phone/verfy', {
                phone: sessionStorage.getItem('phone'),
                otp: otpRef.current.value,
            })
            .then((res) => {
                if (res.status === 201) {
                    toast.success('Login is successful!')
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('name', sessionStorage.getItem('name'))
                    setStep(false)
                    setOpen(false)
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    toast.error('User blocked for 24h')
                }
                if (err.response.status === 400) {
                    toast.error('Invalid OTP')
                }
            })
    }
    return (
        <>
            <h1 className={styles.title}>Enter the OTP code</h1>
            <p className={styles.content}>
                Dear {sessionStorage.getItem('name')} , enter the OTP code sent
                to {sessionStorage.getItem('phone')}
            </p>
            <div>
                <div className={styles.timerSection}>
                    <p className={styles.timerTitle}>OTP Code</p>
                    <p className={styles.timer}>
                        {minutes}:{seconds}
                    </p>
                </div>
                <input
                    type="text"
                    placeholder={'1234'}
                    className={styles.formInput}
                    ref={otpRef}
                />
            </div>
            <button className={styles.verifyButton} onClick={handleVerify}>
                Continue
            </button>
        </>
    )
}

export default ExistUser
