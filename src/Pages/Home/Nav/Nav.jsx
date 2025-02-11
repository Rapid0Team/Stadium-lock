import { useState,useEffect } from 'react';
import './Nav.css'
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
    const [linkNav, setlinkNav] = useState('')
    const [toggelHeader, setToggelHeader] = useState(false)
    const [showButton, setShowButton] = useState(false);
    const handelToggel = () => {
        setToggelHeader(prevState => !prevState)
    }
    const handelClickNav = (link) => {
        setlinkNav(link)
        setToggelHeader(false)
    }
    


    useEffect(() => {
        fetch(`http://localhost/Stadium-lock/public/Backend/PHP/user/confirmemail.php`)
          .then((res) => res.json())
          .then((data) => setShowButton(data.showButton));
      }, []);
    const userlogin = useSelector((state) => state.userFinded);
    return (
        <>

            <div className="header-container" id='nav'>
                <Link to='/' className='header-logo'>OrLock</Link>
             {showButton && <Link to={'/daschbord'} className={`bg-blue-400 p-2 rounded-2xl hover:bg-blue-300 hover:p-3 translate-x-2 opacity-2 text-white`}>Dachbored</Link>}  

                <div className={toggelHeader ? 'navigation active' : 'navigation'}>
                    <nav className="nav-container">
                
                       
                    </nav>
                    <div className="btn-reservation btn "><Link to="/reserver">Reserver</Link></div>
                    <div className="btn-reservation btn"><Link to="/spectateur">matches</Link></div>
                   
                    {userlogin.username? <div className="btn-reservation btn"><Link to="/profile">profile</Link></div>   
                   
                    
                    : "" }
                </div>
                <div className="btn-toggel">
                    {toggelHeader ? <IoMdClose
                        className='btn-toggel-icon'
                        onClick={handelToggel}
                    /> : <HiMiniBars3BottomLeft
                        className='btn-toggel-icon'
                        onClick={handelToggel}
                    />}
                </div>
            </div>



            <div className={toggelHeader ? 'header-disaibled active' : ''}></div>

        </>
    )
}
export default Nav
