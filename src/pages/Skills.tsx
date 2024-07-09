import { useRecoilValue } from "recoil";
import { isLoggedIn, themeState } from "../assets/store/state";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SkillType } from "@satyagade/common-for-portfolio";
import axios from "axios";
import SkillCard from "../components/SkillCard";

interface SkillProps extends SkillType {
  id: string
}

const Skills = () => {

  const darkmode = useRecoilValue(themeState);
  const isloggedin = useRecoilValue(isLoggedIn);
  const [webDevSkills, setWebDevSkills] = useState<SkillProps[]>([])
  const [embeddedSkills, setEmbeddedSkills] = useState<SkillProps[]>([])
  const [showWebSkills, setShowWebSkills] = useState(true);

  const navigate = useNavigate();

  const getSkills = async () => {
    try {
      axios.get('https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/skills', {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          setWebDevSkills(response.data.filter((temp: SkillProps) => temp.field === 'webDev'));
          setEmbeddedSkills(response.data.filter((temp: SkillProps) => temp.field === 'embedded'));
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {
      console.log('get skills error: ', error);
    }
  }

  useEffect(() => {
    getSkills();
    if(darkmode){
      document.body.style.backgroundColor = '#121212'
    }else{
      document.body.style.backgroundColor = 'white'
    }
  }, [darkmode])

  return (
    <div className={`py-2 px-4 md:py-4 md:px-8 lg:px-28 md:my-20 my-16 ${darkmode ? "text-Txt bg-bodyBg" : ""}`}>
      <h1 className={`text-center text-3xl md:text-4xl font-semibold`}>Skills</h1>
      <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
        <div className={`text-center cursor-pointer transition ease-in-out hover:transform hover:scale-95 active:transform active:scale-95 rounded-lg ${darkmode ? (showWebSkills ? "bg-btnBg text-btnTxt" : "border-2") : (showWebSkills ? "bg-cyan-500 text-white hover:bg-cyan-700" : "border-2")}`}>
          <button onClick={() => setShowWebSkills(true)} className="font-medium py-2 px-8 w-full rounded-lg h-full">Web Developement</button>
        </div>
        <div className={`text-center cursor-pointer transition ease-in-out hover:transform hover:scale-95 active:transform active:scale-100 rounded-lg ${darkmode ? (!showWebSkills ? "bg-btnBg text-btnTxt" : "border-2") : (!showWebSkills ? "bg-cyan-500 text-white hover:bg-cyan-700" : "border-2")}`}>
          <button onClick={() => setShowWebSkills(false)} className="font-medium py-2 px-8 w-full rounded-lg h-full">Embedded Systems</button>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {
          showWebSkills
            ?
            webDevSkills.map((ski) => {
              return <SkillCard key={ski.id} id={ski.id} title={ski.title} imgPath={ski.imgPath} field={ski.field} />
            })
            :
            embeddedSkills.map((ski) => {
              return <SkillCard key={ski.id} id={ski.id} title={ski.title} imgPath={ski.imgPath} field={ski.field} />
            })
        }
      </div>
      {
        isloggedin && <div onClick={() => navigate('/admin/skill/add')} className={`mt-2 text-center transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
          <button className="w-full py-3 font-medium">Add Skills</button>
        </div>
      }
    </div>
  )
}

export default Skills
