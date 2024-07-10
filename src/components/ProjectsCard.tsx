import { ProjectType } from "@satyagade/common-for-portfolio"
import { isLoggedIn, themeState, token } from "../assets/store/state";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface ProjectProps extends ProjectType {
  id: string
}

const ProjectsCard = ({ id, title, description, imgPath, sourceLink, deployedLink }: ProjectProps) => {

  const darkmode = useRecoilValue(themeState);
  const isloggedin = useRecoilValue(isLoggedIn);
  const jwtToken = useRecoilValue(token);

  const deleteSkill = async (deleteById: string) => {
    try {
      axios.delete(`https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/project/${deleteById}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        }
      })
        .then(function (response) {
          toast.success(response.data.message)
          //bug: after deleting,  manually we have to refresh page for seeing result
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {
      console.log('get education error: ', error);
    }
  }

  return (
    <div className={`relative md:w-3/12 w-3/4 p-2 shadow-cardShadow ${darkmode ? "bg-bodyBg text-Txt" : ""}`}>
      <div className="mt-2">
        <img className="mx-auto w-40 h-40" src={imgPath} alt={`Image of ${title}`} />
      </div>
      <div className="mt-2 mb-8">
        <h2 className="text-center text-2xl">{title}</h2>
        <p className="text-lg mt-2">{description.slice(0, 45)} <Link to={`/project/${id}`}  className={`underline cursor-pointer ${darkmode ? "text-btnBg hover:text-linkHover" : "hover:text-cyan-500 text-cyan-700"}`}>Read more</Link></p>
      </div>
      <div className="flex justify-between mb-2 absolute bottom-0 left-0 right-0 px-2">
        <Link to={sourceLink} className={`underline ${darkmode ? "text-btnBg hover:text-linkHover" : "hover:text-cyan-500 text-cyan-700"}`}>Source Code</Link>
        <Link to={deployedLink} className={`underline ${darkmode ? "text-btnBg hover:text-linkHover" : "hover:text-cyan-500 text-cyan-700"}`}>Visit Website</Link>
      </div>
      {
        isloggedin &&
        <div className={`text-center mt-1 cursor-pointer transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
          <button onClick={() => deleteSkill(id)} className="font-medium py-1 w-full bg-red-500 h-full">Delete</button>
        </div>
      }
    </div>
  )
}

export default ProjectsCard
