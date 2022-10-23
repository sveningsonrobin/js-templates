import { IProjectTemplate } from '../types';
import { askForString } from '../utils';

interface IOptions {
    projectName: string;
}

export const libraryReactTemplate: IProjectTemplate<IOptions> = {
    name: 'library-react',
    directoriesToCreate: [
        'public',
        'src',
        'src/components',
        'src/components/some-component',
    ],
    getFiles: () => {
        return [
            {
                source: 'gitignore',
                target: '.gitignore',
            },
            {
                source: 'library-react/tsconfig-main.json',
                target: 'tsconfig.json',
            },
            {
                source: 'library-react/package-template.json',
                target: 'package.json',
                getReplaceTerms: (answers) => {
                    return {
                        '#PROJECT_NAME#': answers.projectName,
                    };
                },
            },
            {
                source: 'library-react/src/declarations.d.ts',
                target: 'src/declarations.d.ts',
            },
            {
                source: 'library-react/public/dev-index.html',
                target: 'public/dev-index.html',
            },
            {
                source: 'library-react/src/dev.tsx',
                target: 'src/dev.tsx',
            },
            {
                source: 'library-react/src/index.tsx',
                target: 'src/index.tsx',
            },
            {
                source: 'library-react/src/style.scss',
                target: 'src/style.scss',
            },
            {
                source: 'library-react/src/components/index.ts',
                target: 'src/components/index.ts',
            },
            {
                source: 'library-react/src/components/some-component/index.ts',
                target: 'src/components/some-component/index.ts',
            },
            {
                source: 'library-react/src/components/some-component/some-component.tsx',
                target: 'src/components/some-component/some-component.tsx',
            },
            {
                source: 'library-react/src/components/some-component/style.scss',
                target: 'src/components/some-component/style.scss',
            },
            {
                source: 'library-react/webpack-dev.config.js',
                target: 'webpack-dev.config.js',
            },
            {
                source: 'library-react/webpack-main.config.js',
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
