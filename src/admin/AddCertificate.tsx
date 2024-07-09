import { ChangeEvent, FormEvent, useState } from "react";
import { themeState, token } from "../assets/store/state";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CertificateType } from "@satyagade/common-for-portfolio";


const AddCertificate = () => {

    const [info, setInfo] = useState<CertificateType>({
        imgPath: "",
        field: ""
    });
    const darkmode = useRecoilValue(themeState);
    const jwtToken = useRecoilValue(token);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            axios.post('https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/certificate', {
                imgPath: info.imgPath,
                field: info.field
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            })
                .then(function (response) {
                    setInfo({
                        imgPath: "",
                        field: ""
                    })
                    toast.success(response.data.message);
                    navigate('/');
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log('add certificate error: ', error);
        }
    }

    return (
        <div className={`py-2 px-4 md:py-4 md:px-8 lg:px-28 w-full h-screen flex justify-center items-center ${darkmode ? "text-Txt bg-bodyBg" : "text-black bg-white"}`}>
            <form className={`w-fit p-6 lg:py-8 lg:px-10 rounded ${darkmode ? "bg-navbarBg text-Txt" : "border"}`} onSubmit={handleSubmit}>
                <div className="text-center">
                    <h1 className="text-2xl lg:text-3xl">Add New Certificate</h1>
                </div>
                <div className="mt-8">
                    <input required className={`border-b w-full border-solid outline-none transition-all ease-in-out ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} type="text" placeholder="Image Path" name="imgPath" value={info.imgPath} onChange={handleChange} />
                </div>
                <div>
                    <select required className={`border-b w-full border-solid outline-none transition-all ease-in-out mt-3 ${darkmode ? "border-borderClr bg-navbarBg text-Txt caret-Txt focus:border-Txt" : "focus:border-black border-gray-400"}`} name="field" id="field" value={info.field} onChange={(e) => {
                        setInfo({
                            ...info,
                            field: e.target.value
                        })
                    }}>
                        <option value="">Choose Field</option>
                        <option value="webDev">Web Development</option>
                        <option value="embedded">Embedded</option>
                    </select>
                </div>
                <div className={`text-center py-1 mt-8 cursor-pointer transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
                    <button type="submit" className="font-medium w-full h-full">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddCertificate
