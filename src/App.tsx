import { BrowserRouter, Routes, Route } from "react-router-dom"

import TopInfoBar from "./components/TopInfoBar/TopInfoBar";
import HomePage from "./pages/HomePage/HomePage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import '../src/components/sharedStyles/all.scss'

export default () => {
    return <>
        <TopInfoBar/>
        <BrowserRouter>
            <Routes>
                <Route element={<HomePage/>} path={'/'}/>
                <Route element={<UserDashboard/>} path={'/userDashboard'}/>
            </Routes>
        </BrowserRouter>
    </>
}