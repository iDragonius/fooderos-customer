import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import NavigationLayout from './layouts/navigationLayout/NavigationLayout'
import MyAddresses from './pages/userPages/my-addresses/MyAddresses'
import MyOrders from './pages/userPages/my-orders/MyOrders'
import Profile from './pages/userPages/profile/Profile'
import RequireAuth from './features/auth/RequireAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import $api from './http'

function App() {
    const [test, useTest] = useState(1)
    const check = async () => {
        await $api.post('active').then((res) => {
            console.log(res)
        })
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            check()
        }
    }, [])
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path={'/'} element={<NavigationLayout />}>
                    <Route index element={<Home />} />
                    <Route element={<RequireAuth />}>
                        <Route
                            path={'my-addresses'}
                            element={<MyAddresses />}
                        />
                        <Route path={'my-orders'} element={<MyOrders />} />
                        <Route path={'profile'} element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
