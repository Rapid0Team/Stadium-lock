import { useState } from 'react';
import './Nav.css'
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
    const [linkNav, setlinkNav] = useState('')
    const [toggelHeader, setToggelHeader] = useState(false)
    const handelToggel = () => {
        setToggelHeader(prevState => !prevState)
    }
    const handelClickNav = (link) => {
        setlinkNav(link)
        setToggelHeader(false)
    }
    const InAdmin = useSelector(state=>state.InAdmin)
    const userlogin = useSelector((state) => state.userFinded);
    return (
        <>

            <div className="header-container" id='nav'>
                <Link to='/' className='header-logo'>OrLock</Link>
                {InAdmin&& InAdmin?<Link to="/daschbord" > <button>Daschbord</button></Link>:''}

                <div className={toggelHeader ? 'navigation active' : 'navigation'}>
                    <nav className="nav-container">
                       
                    </nav>
                    <div className="btn-reservation btn"><Link to="/reserver">Reserver</Link></div>
                    <div className="btn-reservation btn"><Link to="/spectateur">matches</Link></div>
                    {userlogin.username? <div className="btn-reservation btn"><Link to="/profile">profile</Link></div> : "" }
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
