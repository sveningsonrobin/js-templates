import { exec } from 'child_process';

import { ICommandExecutor } from '../types';
import { fontDim } from '../utils';

export class CommandExecutorService implements ICommandExecutor {
    private workingDirectory: string;

    constructor(workingDirectory: string) {
        this.workingDirectory = workingDirectory;
    }

    async execute(command: string) {
        console.log(fontDim(`Executing: "${command}"...`));

        return new Promise((resolve, reject) => {
            exec(command, {
                cwd: this.workingDirectory
            }, (error) => {
                if (error) {
                    reject(error.message);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
