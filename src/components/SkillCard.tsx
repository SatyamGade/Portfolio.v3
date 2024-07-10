import { SkillType } from "@satyagade/common-for-portfolio"
import { isLoggedIn, themeState, token } from "../assets/store/state";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { toast } from "react-toastify";

interface SkillProps extends SkillType {
  id: string
}


const SkillCard = ({ id, title }: SkillProps) => {

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
    <div className={`rounded-xl border ${darkmode ? "bg-bodyBg text-Txt" : "border-black"}`}>
      <h2 className="py-2 px-4 text-center text-xl font-semibold">{title}</h2>
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
