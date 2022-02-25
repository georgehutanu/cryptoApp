import { BrowserRouter, Routes, Route } from "react-router-dom"

import TopInfoBar from "./components/TopInfoBar/TopInfoBar"
import HomePage from "./pages/HomePage/HomePage"
import UserDashboard from "./pages/UserDashboard/UserDashboard"
import '../src/components/sharedStyles/all.scss'
import CoinPage from "./pages/CoinPage/CoinPage"
import AddUser from "./pages/AddUser/AddUser"

export default () => {
    return <>
        <TopInfoBar/>
        <BrowserRouter>
            <Routes>
                <Route element={<HomePage/>} path={'/'}/>
                <Route element={<CoinPage/>} path={'/coin/:coin'}/>
                <Route element={<UserDashboard/>} path={'/userDashboard'}/>
                <Route element={<AddUser/>} path={'/addUser/:userID'}/>
            </Routes>
        </BrowserRouter>
    </>
}