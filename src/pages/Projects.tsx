import { useRecoilValue } from "recoil";
import { isLoggedIn, themeState } from "../assets/store/state";
import { useNavigate } from "react-router-dom";
import { ProjectType } from "@satyagade/common-for-portfolio";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectsCard from "../components/ProjectsCard";

interface ProjectProps extends ProjectType {
  id: string
}

const Projects = () => {

  const darkmode = useRecoilValue(themeState);
  const isloggedin = useRecoilValue(isLoggedIn);
  const [webDevProjects, setWebDevProjects] = useState<ProjectProps[]>([])
  const [embeddedProjects, setEmbeddedProjects] = useState<ProjectProps[]>([])
  const [showWebProjects, setShowWebProjects] = useState(true);

  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      axios.get('https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/projects', {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          setWebDevProjects(response.data.filter((temp: ProjectProps) => temp.field === 'webDev'));
          setEmbeddedProjects(response.data.filter((temp: ProjectProps) => temp.field === 'embedded'));
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {
      console.log('get projects error: ', error);
    }
  }

  useEffect(() => {
    getProjects();
    if(darkmode){
      document.body.style.backgroundColor = '#121212'
    }else{
      document.body.style.backgroundColor = 'white'
    }
  }, [darkmode])

  return (
    <div className={`py-2 px-4 md:py-4 md:px-8 lg:px-28 md:my-20 my-16 ${darkmode ? "text-Txt bg-bodyBg" : ""}`}>
      <h1 className={`text-center text-3xl md:text-4xl font-semibold`}>Projects</h1>
      <div className="flex flex-col sm:flex-row gap-2 mt-10 justify-center">
        <div className={`text-center cursor-pointer transition ease-in-out hover:transform hover:scale-95 active:transform active:scale-95 rounded-lg ${darkmode ? (showWebProjects ? "bg-btnBg text-btnTxt" : "border-2") : (showWebProjects ? "bg-cyan-500 text-white hover:bg-cyan-700" : "border-2")}`}>
          <button onClick={() => setShowWebProjects(true)} className="font-medium py-2 px-8 w-full rounded-lg h-full">Web Developement</button>
        </div>
        <div className={`text-center cursor-pointer transition ease-in-out hover:transform hover:scale-95 active:transform active:scale-95 rounded-lg ${darkmode ? (!showWebProjects ? "bg-btnBg text-btnTxt" : "border-2") : (!showWebProjects ? "bg-cyan-500 text-white hover:bg-cyan-700" : "border-2")}`}>
          <button onClick={() => setShowWebProjects(false)} className="font-medium py-2 px-8 w-full rounded-lg h-full">Embedded Systems</button>
        </div>
      </div>
      <div className={`mt-10 flex flex-wrap justify-center gap-4`}>
        {
          showWebProjects
            ?
            webDevProjects.length === 0
              ?
              <div className="text-3xl flex justify-center w-full">
                <h3>Projects comming soon!</h3>
              </div>
              :
              webDevProjects.map((pro) => {
                return <ProjectsCard key={pro.id} id={pro.id} title={pro.title} description={pro.description} imgPath={pro.imgPath} technologyUsed={pro.technologyUsed} sourceLink={pro.sourceLink} deployedLink={pro.deployedLink} field={pro.field} />
              })
            :
            embeddedProjects.length === 0
              ?
              <div className="text-3xl flex justify-center w-full">
                <h3>Projects comming soon!</h3>
              </div>
              :
              embeddedProjects.map((pro) => {
                return <ProjectsCard key={pro.id} id={pro.id} title={pro.title} description={pro.description} imgPath={pro.imgPath} technologyUsed={pro.technologyUsed} sourceLink={pro.sourceLink} deployedLink={pro.deployedLink} field={pro.field} />
              })
        }
      </div>
      {
        isloggedin && <div onClick={() => navigate('/admin/project/add')} className={`mt-2 text-center transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
          <button className="w-full py-3 font-medium">Add Projects</button>
        </div>
      }
    </div>
  )
}

export default Projects
