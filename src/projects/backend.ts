import { IProjectTemplate } from '../types';
import { askForString } from '../utils';

interface IOptions {
    projectName: string;
}

export const backendTemplate: IProjectTemplate<IOptions> = {
    name: 'backend',
    directoriesToCreate: ['src'],
    getFiles: () => {
        return [
            {
                source: 'backend/src/dev.ts',
                target: 'src/dev.ts',
            },
            {
                source: 'backend/src/index.ts',
                target: 'src/index.ts',
            },
            {
                source: 'backend/src/types.ts',
                target: 'src/types.ts',
            },
            {
                source: 'backend/app.yaml',
                target: 'app.yaml',
            },
            {
                source: 'backend/env',
                target: '.env',
            },
            {
                source: 'backend/gcloudignore',
                target: '.gcloudignore',
            },
            {
                source: 'backend/gitignore',
                target: '.gitignore',
            },
            {
                source: 'backend/package-template.json',
                target: 'package.json',
                getReplaceTerms: (answers) => {
                    return {
                        '#PROJECT_NAME#': answers.projectName,
                    };
                },
            },
            {
                source: 'backend/predeploy.js',
                target: 'predeploy.js',
            },
            {
                source: 'backend/tsconfig-template.json',
                target: 'tsconfig.json',
            },
            {
                source: 'backend/webpack-dev.config.js',
                target: 'webpack-dev.config.js',
            },
            {
                source: 'backend/webpack.config.js',
                target: 'webpack.config.js',
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
