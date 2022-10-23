import { IProjectTemplate } from '../types';
import { askForString } from '../utils';

interface IOptions {
    projectName: string;
}

export const frontendTemplate: IProjectTemplate<IOptions> = {
    name: 'frontend',
    directoriesToCreate: ['public', 'public/static', 'src'],
    getFiles: () => {
        return [
            {
                source: 'gitignore',
                target: '.gitignore',
            },
            {
                source: 'frontend/babelrc',
                target: '.babelrc',
            },
            {
                source: 'frontend/package-template.json',
                target: 'package.json',
                getReplaceTerms: (answers) => {
                    return {
                        '#PROJECT_NAME#': answers.projectName,
                    };
                },
            },
            {
                source: 'frontend/tsconfig-main.json',
                target: 'tsconfig.json',
            },
            {
                source: 'frontend/webpack-main.config.js',
                target: 'webpack.config.js',
            },
            {
                source: 'frontend/public/index.html',
                target: 'public/index.html',
            },
            {
                source: 'frontend/public/static/favicon.png',
                target: 'public/static/favicon.png',
            },
            {
                source: 'frontend/src/app.tsx',
                target: 'src/app.tsx',
            },
            {
                source: 'frontend/src/declarations.d.ts',
                target: 'src/declarations.d.ts',
            },
            {
                source: 'frontend/src/index.tsx',
                target: 'src/index.tsx',
            },
            {
                source: 'frontend/src/style.scss',
                target: 'src/style.scss',
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
