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
exports.ProjectService = void 0;
const ProjectRepository_1 = require("../repositories/ProjectRepository");
class ProjectService {
    constructor(projectRepository = new ProjectRepository_1.ProjectRepository()) {
        this.getAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.projectRepository.getAll();
            const data = {
                items: result.rows,
                count: result.rowCount
            };
            return response.status(200).json(data);
        });
        this.updateProject = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { idProject } = request.params;
            try {
                const currentProject = (yield this.projectRepository.getById(idProject)).rows[0];
                const editProjectData = request.body;
                const editedProject = Object.assign(Object.assign({}, currentProject), editProjectData);
                const techArray = `{${editedProject.tech.map((tech) => `"${tech}"`).join(',')}}`;
                console.log(editedProject, 'hi');
                yield this.projectRepository.update(idProject, editedProject, techArray);
                return response.status(200).json(editedProject);
            }
            catch (error) {
                response.status(500).json({ message: "An error occurred", error: error });
            }
        });
        this.addNewProject = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const newData = request.body;
            const techArray = `{${newData.tech.map((tech) => `"${tech}"`).join(',')}}`;
            const newProject = yield this.projectRepository.addNew(newData, techArray);
            return response.status(200).json(newProject);
        });
        this.deleteProject = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { idProject } = request.params;
            try {
                yield this.projectRepository.deleteProject(idProject);
                return response.status(200).json({ message: `${idProject} deletado com sucesso` });
            }
            catch (error) {
                return response.status(500).json({ message: "An error occurred", error });
            }
        });
        this.projectRepository = projectRepository;
    }
}
exports.ProjectService = ProjectService;
