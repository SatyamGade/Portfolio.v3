// import { useRecoilValue } from "recoil";
// import { isLoggedIn, themeState } from "../assets/store/state";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CertificateType } from "@satyagade/common-for-portfolio";

// interface CertificateProps extends CertificateType {
//     id: string
// }


const Certificates = () => {

    // const darkmode = useRecoilValue(themeState);
    // const isloggedin = useRecoilValue(isLoggedIn);
    // //
    // const [webDevCertificates, setWebDevCertificates] = useState<CertificateProps[]>([])
    // const [embeddedCertificates, setEmbeddedCertificates] = useState<CertificateProps[]>([])
    // const [showWebCertificates, setShowWebCertificates] = useState(true);

    // const navigate = useNavigate();

    // const getCertificates = async () => {
    //     try {
    //         axios.get('https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/certificates', {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //             .then(function (response) {
    //                 setWebDevCertificates(response.data.filter((temp: CertificateProps) => temp.field === 'webDev'));
    //                 setEmbeddedCertificates(response.data.filter((temp: CertificateProps) => temp.field === 'embedded'));
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });

    //     } catch (error) {
    //         console.log('get certificate error: ', error);
    //     }
    // }

    // useEffect(() => {
    //     getCertificates();
    //     if (darkmode) {
    //         document.body.style.backgroundColor = '#121212'
    //     } else {
    //         document.body.style.backgroundColor = 'white'
    //     }
    // }, [darkmode])

    return (
        <></>
        // <div className={`py-2 px-4 md:py-4 md:px-8 lg:px-28 md:my-20 my-16 ${darkmode ? "text-Txt bg-bodyBg" : ""}`}>
        //     <h1 className={`text-center text-3xl md:text-4xl font-semibold`}>Certificates</h1>
        //     <div className="flex flex-col sm:flex-row gap-2 mt-10 justify-center">
        //         <div className={`text-center cursor-pointer transition ease-in-out hover:transform hover:scale-95 active:transform active:scale-95 rounded-lg ${darkmode ? (showWebCertificates ? "bg-btnBg text-btnTxt" : "border-2") : (showWebCertificates ? "bg-cyan-500 text-white hover:bg-cyan-700" : "border-2")}`}>
        //             <button onClick={() => setShowWebCertificates(true)} className="font-medium py-2 px-8 w-full rounded-lg h-full">Web Developement</button>
        //         </div>
        //         <div className={`text-center cursor-pointer transition ease-in-out hover:transform hover:scale-95 active:transform active:scale-95 rounded-lg ${darkmode ? (!showWebCertificates ? "bg-btnBg text-btnTxt" : "border-2") : (!showWebCertificates ? "bg-cyan-500 text-white hover:bg-cyan-700" : "border-2")}`}>
        //             <button onClick={() => setShowWebCertificates(false)} className="font-medium py-2 px-8 w-full rounded-lg h-full">Embedded Systems</button>
        //         </div>
        //     </div>
        //     {/* show certificates */}
        //     {
        //         isloggedin && <div onClick={() => navigate('/admin/certificate/add')} className={`mt-2 text-center transition ease-in-out active:transform active:scale-95 ${darkmode ? "bg-btnBg text-btnTxt" : "bg-cyan-500 text-white hover:bg-cyan-700"}`}>
        //             <button className="w-full py-3 font-medium">Add Certificate</button>
        //         </div>
        //     }
        // </div>
    )
}

export default Certificates
