import { useState } from "react"
import { LuMenu } from "react-icons/lu"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RxCross2 } from "react-icons/rx"
import { useRecoilState } from "recoil";
import { isLoggedIn, themeState } from "../assets/store/state";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const [hamburger, setHamburger] = useState(true);
  const [darkmode, setDarkMode] = useRecoilState(themeState);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isloggedin, setIsloggedin] = useRecoilState(isLoggedIn);
  const [activeLink, setActiveLink] = useState('home');

  const navigate = useNavigate();

  const handleClick = () => {
    setHamburger(true);
  }

  return (
    <nav className={`flex justify-between items-center py-2 px-4 md:py-4 md:px-8 lg:px-28 ${darkmode ? "text-Txt bg-navbarBg" : "border-b border-black bg-white text-black"} ${hamburger ? "fixed top-0 right-0 left-0 z-50" : ""}`}>
      <div className="relative">
        <h1 className={`text-xl hover:text-linkHover font-semibold md:text-2xl cursor-pointer`} onClick={() => setShowLoginDialog((prev) => !prev)}>Portfolio</h1>
        {
          !isloggedin
            ?
            showLoginDialog && <span className={`absolute left-8 top-8 md:top-10 cursor-pointer hover:text-linkHover w-max border p-1 rounded-lg text-sm ${darkmode ? "bg-navbarBg text-Txt border-Txt" : "bg-white border-black"}`} onClick={() => {
              !(location.pathname === '/admin/signin') ? navigate('/admin/signin') : navigate('/');
            }}>{`${location.pathname === '/admin/signin' ? 'Back to Home' : 'Login as Admin'}`}</span>
            :
            !showLoginDialog && <span className={`absolute left-8 top-8 md:top-10 cursor-pointer hover:text-linkHover w-max border p-1 rounded-lg text-sm ${darkmode ? "bg-navbarBg text-Txt border-Txt" : "bg-white border-black"}`} onClick={() => {
              setIsloggedin(false);
              localStorage.removeItem("portfolioToken");
              navigate('/');
            }}>Log out</span>
        }
      </div>
      <div className={`md:flex md:items-center flex-row-reverse`}>
        <ul className={`flex flex-col md:flex-row fixed top-0 md:static w-full md:w-min h-full md:h-min justify-center items-center transition-all ease-in-out z-10 ${!hamburger ? "right-0" : "right-full"} ${darkmode ? "text-Txt bg-navbarBg" : "bg-white"}`}>

          <Link onClick={handleClick} to={'/'} ><li onClick={() => { setActiveLink('home') }} className={`text-xl font-medium md:hover:mb-1 mt-2 md:mt-0 md:ps-4 cursor-pointer hover:text-linkHover ${activeLink === 'home' ? "text-linkHover" : ""}`}>Home</li></Link>

          <Link onClick={handleClick} to={'/education'} ><li onClick={() => { setActiveLink('education') }} className={`text-xl font-medium md:hover:mb-1 mt-2 md:mt-0 md:ps-4 cursor-pointer hover:text-linkHover ${activeLink === 'education' ? "text-linkHover" : ""}`}>Education</li></Link>

          <Link onClick={handleClick} to={'/skills'}><li onClick={() => { setActiveLink('skills') }} className={`text-xl font-medium md:hover:mb-1 mt-2 md:mt-0 md:ps-4 cursor-pointer hover:text-linkHover ${activeLink === 'skills' ? "text-linkHover" : ""}`}>Skills</li></Link>

          <Link onClick={handleClick} to={'/projects'}><li onClick={() => { setActiveLink('projects') }} className={`text-xl font-medium md:hover:mb-1 mt-2 md:mt-0 md:ps-4 cursor-pointer hover:text-linkHover ${activeLink === 'projects' ? "text-linkHover" : ""}`}>Projects</li></Link>

          {/* <Link onClick={handleClick} to={'/certificates'}><li onClick={() => { setActiveLink('certificates') }} className={`text-xl font-medium md:hover:mb-1 mt-2 md:mt-0 md:ps-4 cursor-pointer hover:text-linkHover ${activeLink === 'certificates' ? "text-linkHover" : ""}`}>Certificates</li></Link> */}

          <Link onClick={handleClick} to={'/contact'}><li onClick={() => { setActiveLink('contact') }} className={`text-xl font-medium md:hover:mb-1 mt-2 md:mt-0 md:ps-4 cursor-pointer hover:text-linkHover ${activeLink === 'contact' ? "text-linkHover" : ""}`}>Contact</li></Link>
        </ul>
        <div className={`flex items-center`}>
          {
            !darkmode
              ?
              <MdDarkMode className={`text-xl md:mt-1 cursor-pointer me-4 md:me-0`} onClick={() => setDarkMode(prev => !prev)} />
              :
              <MdOutlineLightMode className={`text-xl md:mt-1 cursor-pointer me-4 md:me-0`} onClick={() => setDarkMode(prev => !prev)} />
          }
          {
            hamburger
              ?
              <LuMenu className={`text-xl cursor-pointer md:hidden`} onClick={() => setHamburger(prev => !prev)} />
              :
              <RxCross2 className={`text-xl cursor-pointer z-20 fixed md:hidden`} onClick={() => setHamburger(prev => !prev)} />
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar