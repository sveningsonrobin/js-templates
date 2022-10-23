import { IProjectTemplate } from '../types';
import { askForString } from '../utils';

interface IOptions {
    projectName: string;
}

export const libraryTemplate: IProjectTemplate<IOptions> = {
    name: 'library',
    directoriesToCreate: ['src', 'tests'],
    getFiles: () => {
        return [
            {
                source: 'gitignore',
                target: '.gitignore',
            },
            {
                source: 'library/babel-main.config.js',
                target: 'babel.config.js',
            },
            {
                source: 'library/jest-config.js',
                target: 'jest.config.js',
            },
            {
                source: 'library/tsconfig-main.json',
                target: 'tsconfig.json',
            },
            {
                source: 'library/tsconfig-build.json',
                target: 'tsconfig.build.json',
            },
            {
                source: 'library/package-template.json',
                target: 'package.json',
                getReplaceTerms: (answers) => {
                    return {
                        '#PROJECT_NAME#': answers.projectName,
                    };
                },
            },
            {
                source: 'library/src/index.ts',
                target: 'src/index.ts',
            },
            {
                source: 'library/tests/index.test.ts',
                target: 'tests/index.test.ts',
            },
        ];
    },
    askQuestions: async () => {
        const projectName = await askForString('What is your project name?');

        return {
            projectName,
        };
    },
};
