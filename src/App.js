import AboutSection from "./Pages/Home/AboutSection/AboutSection";
import Feautures from "./Pages/Home/Feautures/Feautures";
import HeroSection from "./Pages/Home/HeroSection/HeroSection";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./Pages/Home/Nav/Nav";
import './index.css'
import ReserveForm from "./Pages/Reservation/reserveForm";
import Register from "./Pages/Users/register";
import Contacte from "./Pages/Home/Contacte/Contacte";
import Footer from "./Pages/Home/FooterSection/Footer";
import { useEffect } from "react";
import Login from "./Pages/Users/login";
import Profile from "./Pages/Users/profile";
import Payment from "./Pages/payment/payment";
import Spectateur from "./Pages/spectateur/spectateur"
import Stadiums from "./Pages/stadiumsTable/stadiumsTable";
import CreateStadium from "./Pages/stadiumsTable/createStadium";
import UpdateStad from "./Pages/stadiumsTable/update";

function Home() {
    return (
        <>
            <HeroSection />
            <Feautures />
            <AboutSection />
            <Contacte />
            <Footer />
        </>
    )
}
function App() {


    return (
        <>
            <BrowserRouter>
                <div><Nav/></div>
                <div >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/reserver" element={<ReserveForm />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/payment" element={<Payment/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/spectateur" element={<Spectateur/>} />
                        <Route path="/stadiums" element={<Stadiums/>} />
                        <Route path="/createStadium" element={<CreateStadium/>} />
                        <Route path="/updateStad/:stadium_id" element={<UpdateStad/>} />
                    </Routes>
                </div>
            </BrowserRouter>

        </>
    );
}

export default App;
