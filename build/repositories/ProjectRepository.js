"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const postgres_1 = require("@vercel/postgres");
class ProjectRepository {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, postgres_1.sql) `
            SELECT id, title, github, live, description, date, image, tech
            FROM projects
            ORDER BY date ASC
            LIMIT 5
        `;
            return data;
        });
        this.getById = (idProject) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, postgres_1.sql) `
            SELECT id, title, github, live, description, date, image, tech
            FROM projects
            WHERE id = ${idProject}
        `;
            return data;
        });
        this.addNew = (newProject, techArray) => __awaiter(this, void 0, void 0, function* () {
            const newData = yield (0, postgres_1.sql) `
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
        });
        this.update = (idProject, editedProject, techArray) => __awaiter(this, void 0, void 0, function* () {
            yield (0, postgres_1.sql) `
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
        });
        this.deleteProject = (idProject) => __awaiter(this, void 0, void 0, function* () {
            yield (0, postgres_1.sql) `
            DELETE FROM projects
            WHERE id = ${idProject};
        `;
        });
    }
}
exports.ProjectRepository = ProjectRepository;
const formatDateForDatabase = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};
