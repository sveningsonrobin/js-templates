import fs from 'fs';
import path from 'path';

import { IFilesystemService } from '../types';

export class FilesystemService implements IFilesystemService {
    private targetDirectory: string;
    private isAllowedToOverwrite: boolean;

    constructor(targetDirectory: string, isAllowedToOverwrite: boolean) {
        this.targetDirectory = targetDirectory;
        this.isAllowedToOverwrite = isAllowedToOverwrite;
    }

    getTargetPath(relativePath: string) {
        return path.resolve(this.targetDirectory, relativePath);
    }

    createDirectory(relativePath: string) {
        const target = this.getTargetPath(relativePath);
        const hasTarget = fs.existsSync(target);

        if (hasTarget) {
            return;
        }

        fs.mkdirSync(target);
    }

    saveFile(relativePath: string, content: string) {
        const target = this.getTargetPath(relativePath);
        const hasTarget = fs.existsSync(target);
        const shouldWrite = this.isAllowedToOverwrite || !hasTarget;

        if (shouldWrite) {
            fs.writeFileSync(target, content);
        } else {
            console.log(`Prevented write to existing file: ${target}`);
        }
    }
};
