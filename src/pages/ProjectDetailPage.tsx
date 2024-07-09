import { useRecoilValue } from "recoil";
import { themeState } from "../assets/store/state";
import axios from "axios";
import { ProjectType } from "@satyagade/common-for-portfolio";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProjectProps extends ProjectType {
    id: string
}

const ProjectDetailPage = () => {

    const [projectInfo, setProjectInfo] = useState<ProjectProps>();
    const darkmode = useRecoilValue(themeState);
    const { id } = useParams();


    const getProjects = async () => {
        try {
            axios.get(`https://portfolio_backend.satyagade8055.workers.dev/api/auth/admin/project/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) {
                    setProjectInfo(response.data);
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
        if (darkmode) {
            document.body.style.backgroundColor = '#121212'
        } else {
            document.body.style.backgroundColor = 'white'
        }
    }, [darkmode, projectInfo])

    return (
        <div className={`flex justify-between flex-col-reverse md:flex-row py-2 px-4 md:py-4 md:px-8 lg:px-28 md:my-20 my-16 ${darkmode ? "text-Txt bg-bodyBg" : ""}`}>
            <div className="md:w-2/3">
                <div className="flex gap-2">
                    <h2 className={`text-3xl md:text-4xl font-semibold`}>Title:</h2>
                    <p className="text-3xl md:text-4xl font-bold">{projectInfo?.title}</p>
                </div>
                <div className="mt-8">
                    <h2 className={`text-3xl md:text-4xl font-semibold`}>Description:</h2>
                    <p className="mt-2 text-lg sm:text-xl">{projectInfo?.description}</p>
                </div>
                <div className="mt-8">
                    <h2 className={`text-3xl md:text-4xl font-semibold`}>Technology Used:</h2>
                    <p className="mt-2 text-lg sm:text-xl flex flex-wrap gap-4">
                    {projectInfo?.technologyUsed.map((tech)=>{
                        return <span>{tech}</span>
                    })}
                    </p>
                </div>
            </div>
            <div className="md:w-1/5 mb-4 md:mb-0">
                <img className="mx-auto w-40 h-40" src={projectInfo?.imgPath} alt={`Image of ${projectInfo?.title}`} />
            </div>
        </div>
    )
}

export default ProjectDetailPage
