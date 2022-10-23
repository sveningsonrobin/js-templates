import { IProjectTemplate } from '../types';

import { backendTemplate } from './backend';
import { frontendTemplate } from './frontend';
import { libraryTemplate } from './library';
import { libraryReactTemplate } from './library-react';

export const allProjects: IProjectTemplate<any>[] = [
    backendTemplate,
    frontendTemplate,
    libraryTemplate,
    libraryReactTemplate,
];
