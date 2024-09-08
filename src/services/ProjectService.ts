import { Request, Response } from "express";
import { ProjectRepository } from "../repositories/ProjectRepository";


export interface IProject {
    id?:string;
    title: string;
    github: string;
    live: string;
    description: string;
    date: string;
    image: string;
    tech: Array<string>;
  }

export class ProjectService {
    private projectRepository: ProjectRepository

    constructor (
        projectRepository = new ProjectRepository()
    ){
        this.projectRepository = projectRepository
    }

    getAll = async (request:Request, response: Response) => {
        
        const result = await this.projectRepository.getAll();

        const data = {
            items: result.rows,
            count: result.rowCount
        }

        return response.status(200).json(data);
    }
    
    updateProject = async (request:Request, response: Response) => {
        
        const {idProject} = request.params;
        try {

            const currentProject = (await this.projectRepository.getById(idProject)).rows[0];
            const editProjectData = request.body;
            const editedProject = {...currentProject, ...editProjectData};
            const techArray:string = `{${editedProject.tech.map((tech:string) => `"${tech}"`).join(',')}}`;
            console.log(editedProject,'hi')
            
            await this.projectRepository.update(idProject,editedProject,techArray);

            return response.status(200).json(editedProject);

        } catch (error) {
            response.status(500).json({message: "An error occurred", error: error})
        }
    }
    
    addNewProject = async (request:Request, response: Response) => {

        const newData:IProject = request.body;
        const techArray:string = `{${newData.tech.map((tech:string) => `"${tech}"`).join(',')}}`;
        const newProject = await this.projectRepository.addNew(newData,techArray);

        return response.status(200).json(newProject);
    }

    deleteProject = async (request: Request, response: Response) => {
        const {idProject} = request.params;
        try {
            await this.projectRepository.deleteProject(idProject);
            return response.status(200).json({message:`${idProject} deletado com sucesso`});
        } catch (error) {
            return response.status(500).json({message: "An error occurred", error});
        }
    }

}
