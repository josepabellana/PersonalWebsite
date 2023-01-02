import { useEffect, useState } from "react";
import { ProjectsData, projectsNav } from "./Data";
import WorksItems from "./WorksItems";
import './work.css'

const Works = () => {

    const [item, setItem] = useState<any>({name:"all"})
    const [projects,setProjects] = useState<any>([]);
    const [active, setActive] = useState(0);

    useEffect(()=> {
        if(item.name === "all"){
            setProjects(ProjectsData)
        }else{
            const newProjects = ProjectsData.filter((project) => {return project.category.toLowerCase() === item.name});
            setProjects(newProjects);
        }
    },[item])

    const handleClick = (e:any, index:number) => {
        setItem({name: e.target.textContent.toLowerCase()});
        setActive(index);
    }

    return (
        <div>
            <div className="work__filters">
            {projectsNav.map((item, index) => {
                return (
                    <span onClick={(e:any)=>handleClick(e,index)} className={`${active === index ? 'active-work' : ''} work__item`} key={index} >{item.name}</span>

                )
            })}
        </div>
        <div className="work__container container grid">
            {projects.map((item:{id:number,image:string,title:string,category:string,}) => {
                return(<WorksItems item={item} key={item.id} />)
            })}
        </div>
        </div>
    )
}

export default Works;
