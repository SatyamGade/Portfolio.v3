import { useRecoilValue } from "recoil";
import { themeState } from "../assets/store/state";
import { MdOutlineFileDownload } from "react-icons/md";
import Resume from '/Satyam_Gade_9422631407.pdf'

const Profile = () => {

  const darkmode = useRecoilValue(themeState);

  return (
    <div className={`flex justify-between flex-col-reverse md:flex-row py-2 px-4 md:py-4 md:px-8 lg:px-28 md:my-40 my-16 items-center ${darkmode ? "text-Txt bg-bodyBg" : ""}`}>
      <div className="md:w-1/2">
        <h1 className="md:text-5xl text-4xl font-bold">Hi, I am <span className={`${darkmode ? "text-btnBg" : "text-cyan-500"}`}>Satyam Gade</span> and I am passionate about <span className={`${darkmode ? "text-btnBg" : "text-cyan-500"}`}>Coding.</span></h1>
        <p className="mt-6 md:text-xl text-lg font-medium">Proficient in various programming languages and eager to apply my technical knowledge to contribute effectively to dynamic IT projects.</p>
        <div className={`text-center text-lg sm:w-56 py-1 my-6 cursor-pointer transition ease-in-out hover:transform hover:scale-95 active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
          <a download href={Resume} className="font-medium w-full h-full flex justify-center items-center gap-1"><MdOutlineFileDownload className="w-6 h-6"/>Download Resume</a>
        </div>
      </div>
      <div className="h-fit mb-8 md:mb-0">
        <img className="rounded-full" src="https://res.cloudinary.com/dwxejs4eu/image/upload/v1720368545/profileImgForPortfolio_lsrtsu.jpg" alt="" />
      </div>
    </div>
  )
}

export default Profile
