import { SkillType } from "@satyagade/common-for-portfolio"
import { isLoggedIn, themeState, token } from "../assets/store/state";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { toast } from "react-toastify";

interface SkillProps extends SkillType {
  id: string
}


const SkillCard = ({ id, title, imgPath }: SkillProps) => {

  const darkmode = useRecoilValue(themeState);
  const isloggedin = useRecoilValue(isLoggedIn);
  const jwtToken = useRecoilValue(token);

  const deleteSkill = async (deleteById: string) => {
    try {
      axios.delete(`https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/skill/${deleteById}`, {
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
    <div className={`md:w-36 p-2 w-28 shadow-cardShadow ${darkmode ? "bg-bodyBg text-Txt" : ""}`}>
      <div className="mt-1">
        <img className="mx-auto w-32 h-28 sm:h-32" src={imgPath} alt={`Image of ${title}`} />
      </div>
      <div className="mt-1">
        <h2 className="text-center text-2xl">{title}</h2>
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

export default SkillCard
