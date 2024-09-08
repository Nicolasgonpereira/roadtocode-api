import { sql } from "@vercel/postgres";
import { IProject } from "../services/ProjectService";


export class ProjectRepository {

    getAll = async () => {
        const data = await sql<IProject>`
            SELECT id, title, github, live, description, date, image, tech
            FROM projects
            ORDER BY date ASC
            LIMIT 5
        `;
        return data;
    }
    
    getById = async (idProject:string) => {
        const data = await sql<IProject>`
            SELECT id, title, github, live, description, date, image, tech
            FROM projects
            WHERE id = ${idProject}
        `;
        return data;
    }
    
    addNew = async (newProject:IProject,techArray:string) => {

        const newData = await sql<IProject>`
            INSERT INTO projects (title, github, live, description, date, image, tech)
            VALUES (
                ${newProject.title},
                ${newProject.github},
                ${newProject.live},
                ${newProject.description},
                ${formatDateForDatabase(newProject.date)},
                ${newProject.image},
                ${techArray}
            )
            RETURNING *;
        `;

        return newData.rows[0];
    }

    update = async (idProject:string, editedProject:IProject,techArray:string) => {
            
        await sql<IProject>`
            UPDATE projects
            SET
                title = ${editedProject.title},
                github = ${editedProject.github},
                live = ${editedProject.live},
                description = ${editedProject.description},
                date = ${formatDateForDatabase(editedProject.date)},
                image = ${editedProject.image},
                tech = ${techArray}
            WHERE id = ${idProject};
        `;
    }

    deleteProject = async (idProject:string) => {
        await sql`
            DELETE FROM projects
            WHERE id = ${idProject};
        `;
    }
}

const formatDateForDatabase = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};