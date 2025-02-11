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

import Users from "./Allusers/Users";

import Dashbord from "./Allusers/Dashbord";

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

                        <Route path="/daschbord" element={<Dashbord></Dashbord>}>
                        <Route path="users" element={<Users></Users>}></Route>
                        
                        
                        
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>

        </>
    );
}

export default App;
