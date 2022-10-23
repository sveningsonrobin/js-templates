import path from 'path';

import {
    ICommandExecutor,
    IFile,
    IFilesystemService,
    IProjectTemplate,
} from './types';

import { allProjects } from './projects';
import { askForOption, getFileContent } from './utils';

export * from './command-executor-service';
export * from './filesystem-service';

const writeFiles = (
    filesRootPath: string,
    filesystemService: IFilesystemService,
    allFiles: IFile<any>[],
    answers: any
) => {
    for (const file of allFiles) {
        const source = path.resolve(filesRootPath, file.source);

        let content = getFileContent(source) || '';
        const replaceTerms = file.getReplaceTerms
            ? file.getReplaceTerms(answers)
            : {};

        for (const [key, value] of Object.entries(replaceTerms)) {
            content = content.replace(new RegExp(key, 'g'), value);
        }

        filesystemService.saveFile(file.target, content);
    }
};

const generateProject = async (
    filesRootPath: string,
    filesystemService: IFilesystemService,
    selectedProject: IProjectTemplate<any>
) => {
    const {
        directoriesToCreate = [],
        getFiles,
        askQuestions,
    } = selectedProject;

    const answers = askQuestions ? await askQuestions() : {};

    for (const directory of directoriesToCreate) {
        filesystemService.createDirectory(directory);
    }

    const allFiles = getFiles(answers);
    writeFiles(filesRootPath, filesystemService, allFiles, answers);
};

export const runGenerator = async (
    filesRootPath: string,
    filesystemService: IFilesystemService,
    commandExecutor: ICommandExecutor
) => {
    const projectNames = allProjects.map((p) => p.name);

    const selectedProjectName = await askForOption(
        'Select project type:',
        projectNames
    );

    const selectedProject = allProjects.find(
        (p) => p.name === selectedProjectName
    );

    await generateProject(filesRootPath, filesystemService, selectedProject);
    await commandExecutor.execute('yarn install');
};
