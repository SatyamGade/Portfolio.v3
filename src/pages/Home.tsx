import { useRecoilValue } from "recoil"
import { themeState } from "../assets/store/state"
import Contact from "./Contact"
import Education from "./Education"
import Profile from "./Profile"
import Projects from "./Projects"
import Skills from "./Skills"
import { useEffect } from "react"
import Certificates from "./Certificates"

const Home = () => {
  const darkmode = useRecoilValue(themeState);

  useEffect(() => {
    if (darkmode) {
      document.body.style.backgroundColor = '#121212'
    } else {
      document.body.style.backgroundColor = 'white'
    }
  }, [darkmode])

  return (
    <main className={`${darkmode ? "text-Txt bg-bodyBg" : ""}`}>
      <Profile />
      <BorderLine darkmode={darkmode} />
      <Education />
      <BorderLine darkmode={darkmode} />
      <Skills />
      <BorderLine darkmode={darkmode} />
      <Projects />
      <BorderLine darkmode={darkmode} />
      <Certificates />
      <BorderLine darkmode={darkmode} />
      <Contact />
    </main>
  )
}

export default Home


const BorderLine = ({ darkmode }: any) => {
  return (
    <div className={`md:w-1/3 w-1/2 mx-auto border-b ${darkmode ? "border-Txt" : "border-black"}`}></div>
  )
}