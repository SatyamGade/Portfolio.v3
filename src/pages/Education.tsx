import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { isLoggedIn, themeState } from "../assets/store/state";
import EducationCard from "../components/EducationCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { EducationType } from "@satyagade/common-for-portfolio";


interface EducationProps extends EducationType {
  id: string
}

const Education = () => {

  const darkmode = useRecoilValue(themeState);
  const isloggedin = useRecoilValue(isLoggedIn);
  const [allEducations, setAllEducations] = useState<EducationProps[]>([]);

  const getEducations = async () => {
    try {
      axios.get('https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/educations', {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          setAllEducations(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {
      console.log('get education error: ', error);
    }
  }

  useEffect(() => {
    getEducations();
    if(darkmode){
      document.body.style.backgroundColor = '#121212'
    }else{
      document.body.style.backgroundColor = 'white'
    }
  }, [darkmode])

  const navigate = useNavigate();

  return (
    <div className={`py-2 px-4 md:py-4 md:px-8 lg:px-28 md:my-20 my-16 ${darkmode ? "text-Txt bg-bodyBg" : ""}`}>
      <h1 className={`text-center text-3xl md:text-4xl font-semibold`}>Education</h1>
      <div className="mt-10 sm:flex justify-between gap-3">
        {
          allEducations.map((edu) => {
            return <EducationCard key={edu.id} id={edu.id} schoolName={edu.schoolName} title={edu.title} percentage={edu.percentage} completionYear={edu.completionYear} field={edu.field} degree={edu.degree} />
          })
        }
      </div>
      {
        isloggedin && <div onClick={() => navigate('/admin/education/add')} className={`mt-2 text-center transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
          <button className="w-full py-3 font-medium">Add Education</button>
        </div>
      }
    </div>
  )
}

export default Education
