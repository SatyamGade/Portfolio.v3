import { EducationType } from "@satyagade/common-for-portfolio"
import { isLoggedIn, themeState, token } from "../assets/store/state";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { toast } from "react-toastify";

interface EducationProps extends EducationType {
    id: string
}

const EducationCard = ({ id, title, schoolName, degree, field, percentage, completionYear }: EducationProps) => {

    const darkmode = useRecoilValue(themeState);
    const isloggedin = useRecoilValue(isLoggedIn);
    const jwtToken = useRecoilValue(token);

    const deleteEducation = async (deleteById: string) => {
        try {
            axios.delete(`https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/education/${deleteById}`, {
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
        <div className={`${darkmode ? "bg-bodyBg text-Txt" : ""}`}>
            <h2 className="text-2xl md:text-3xl font-medium mt-4">{title}</h2>
            <p className="mt-1 text-lg">School Name: {schoolName}</p>
            <p className="mt-1 text-lg">Degree: {degree}</p>
            <p className="mt-1 text-lg">Field: {field}</p>
            <p className="mt-1 text-lg">Percentage: {percentage}%</p>
            <p className="mt-1 text-lg">Completion Year: {completionYear}</p>
            {
                isloggedin &&
                <div className={`text-center mt-1 cursor-pointer transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
                    <button onClick={() => deleteEducation(id)} className="font-medium py-1 w-full bg-red-500 h-full">Delete</button>
                </div>
            }
        </div>
    )
}

export default EducationCard
