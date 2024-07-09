import { ChangeEvent, FormEvent, useState } from "react"
import { themeState, token } from "../assets/store/state";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EducationType } from "@satyagade/common-for-portfolio";
import axios from "axios";

const AddEducation = () => {

  const [info, setInfo] = useState<EducationType>({
    title: "",
    schoolName: "",
    degree: "",
    field: "",
    percentage: 0,
    completionYear: 0
  });
  const darkmode = useRecoilValue(themeState);
  const navigate = useNavigate();
  const jwtToken = useRecoilValue(token);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios.post('https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/education', {
        title: info.title,
        schoolName: info.schoolName,
        degree: info.degree,
        field: info.field,
        percentage: Number(info.percentage),
        completionYear: Number(info.completionYear)
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        }
      })
        .then(function (response) {
          setInfo({
            title: "",
            schoolName: "",
            degree: "",
            field: "",
            percentage: 0,
            completionYear: 0
          })
          toast.success(response.data.message);
          navigate('/');
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {
      console.log('add education error: ', error);
    }
  }

  return (
    <div className={`py-2 px-4 md:py-4 md:px-8 lg:px-28 w-full h-screen flex justify-center items-center ${darkmode ? "text-Txt bg-bodyBg" : "text-black bg-white"}`}>
      <form className={`w-fit p-6 lg:py-8 lg:px-10 rounded ${darkmode ? "bg-navbarBg text-Txt" : "border"}`} onSubmit={handleSubmit}>
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl">Add New Education</h1>
        </div>
        <div className="mt-8">
          <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="text" placeholder="Title" name="title" value={info.title} onChange={handleChange} />
        </div>
        <div className="mt-8">
          <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="text" placeholder="School Name" name="schoolName" value={info.schoolName} onChange={handleChange} />
        </div>
        <div>
          <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out mt-3 ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="text" placeholder="Degree" name="degree" value={info.degree} onChange={handleChange} />
        </div>
        <div>
          <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out mt-3 ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="text" placeholder="Field" name="field" value={info.field} onChange={handleChange} />
        </div>
        <div>
          <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out mt-3 ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="number" placeholder="Completion Year" name="completionYear" value={info.completionYear} onChange={handleChange} />
        </div>
        <div>
          <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out mt-3 ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="number" placeholder="Percentage" name="percentage" value={info.percentage} onChange={handleChange} />
        </div>
        <div className={`text-center py-1 mt-8 cursor-pointer transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
          <button type="submit" className="font-medium w-full h-full">Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddEducation
