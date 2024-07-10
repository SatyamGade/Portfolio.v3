import { useRecoilValue } from "recoil";
import { themeState } from "../assets/store/state";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {

  const darkmode = useRecoilValue(themeState);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (darkmode) {
      document.body.style.backgroundColor = '#121212'
    } else {
      document.body.style.backgroundColor = 'white'
    }
  }, [darkmode])

  return (
    <div className={`mb-24 py-2 px-4 md:py-4 md:px-8 lg:px-28 md:mt-20 mt-16 ${darkmode ? "text-Txt bg-bodyBg" : ""}`}>
      <h1 className={`text-center text-3xl md:text-4xl font-semibold`}>Contact</h1>
      <form action="https://formsubmit.co/satyagade8055@gmail.com" method='POST' className={`mt-10 sm:w-80 w-11/12 py-1 px-4 sm:px-8 mx-auto shadow-cardShadow ${darkmode ? "text-txt bg-navbarBg" : ""}`}>
        <div className="mt-8">
          <label htmlFor="name"></label>
          <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="text" placeholder="Name" name="name" value={info.name} onChange={handleChange} />
        </div>
        <div className="mt-4">
          <label htmlFor="email"></label>
          <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="email" placeholder="Email" name="email" value={info.email} onChange={handleChange} />
        </div>
        <div className="mt-4">
          <label htmlFor="message"></label>
          <textarea required className={`border-b w-full border-solid outline-none transition-all ease-in-out ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} placeholder="Message" name="message" value={info.message} onChange={(e) => {
            setInfo({
              ...info,
              message: e.target.value
            })
          }} />
        </div>
        <div className={`text-center mx-auto md:w-4/5 py-1 my-6 cursor-pointer transition ease-in-out hover:transform hover:scale-95 active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
          <button type="submit" className="font-medium w-full h-full">Submit</button>
        </div>
        <div className="mb-4 mx-auto flex flex-wrap justify-center gap-2 md:gap-3">
          <Link to={'https://github.com/SatyamGade'} target="_blank"><img className={`w-8 h-8 ${darkmode ? "" : "bg-black rounded-full"}`} src="https://res.cloudinary.com/dwxejs4eu/image/upload/v1720354403/github_lrqpcn.png"></img></Link>

          <Link to={'https://linkedin.com/in/satyam-gade-904458265'} target="_blank"><img className="w-8 h-8" src="https://res.cloudinary.com/dwxejs4eu/image/upload/v1720354403/linkedin_q896z2.png"></img></Link>

          <Link to={'https://wa.me/+919422631407?text=I%20am%20interested%20in%20your%20profile%20and%20wants%20to%20hire%20you.%20Let%20me%20know,%20you%20are%20available%20or%20not.%20Thank%20You.'} target="_blank"><img className="w-8 h-8" src="https://res.cloudinary.com/dwxejs4eu/image/upload/v1720354404/whatsapp_dmm1o5.png"></img></Link>

          <Link to={'https://www.instagram.com/iamsatya_7?igsh=MWl6bm1kbmU0aDBxNw=='} target="_blank"><img className="w-8 h-8" src="https://res.cloudinary.com/dwxejs4eu/image/upload/v1720354404/instagram_xiguv7.png"></img></Link>
        </div>
      </form>
    </div>
  )
}

export default Contact
