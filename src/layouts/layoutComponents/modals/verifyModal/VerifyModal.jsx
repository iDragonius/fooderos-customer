import React from 'react'
import AuthModal from '../../../../components/ui/modals/authModal/AuthModal'
import NonExistUser from './NonExistUser/NonExistUser'
import ExistUser from './ExistUser/ExistUser'
import NonExistUserSc from '../loginModal/authSocial/NonExistUserSC/NonExistUserSc'

const VerifyModal = ({ open, setOpen, setStep, step, exist, sc }) => {
    return (
        <AuthModal open={open} setOpen={setOpen} setStep={setStep}>
            {!sc ? (
                <>
                    {exist ? (
                        <ExistUser
                            setStep={setStep}
                            step={step}
                            setOpen={setOpen}
                        />
                    ) : (
                        <NonExistUser
                            setStep={setStep}
                            step={step}
                            setOpen={setOpen}
                        />
                    )}
                </>
            ) : (
                <NonExistUserSc
                    setStep={setStep}
                    step={step}
                    setOpen={setOpen}
                />
            )}
        </AuthModal>
    )
}

export default VerifyModal
