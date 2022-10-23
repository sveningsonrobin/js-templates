import fs from 'fs';
import path from 'path';

import {
    runGenerator,
    MockFilesystemService,
    FilesystemService,
    CommandExecutorService,
    MockCommandExecutorService,
} from './index';

const targetDirectory = process.argv.length > 2 ? process.argv[2] : null;
let fullTargetDirectory: string;

if (targetDirectory) {
    fullTargetDirectory = path.resolve(
        process.cwd(),
        'test-projects',
        targetDirectory
    );
    
    const hasDirectory = fs.existsSync(fullTargetDirectory);

    if (hasDirectory) {
        throw new Error(`Target already exists: ${fullTargetDirectory}`);
    }

    fs.mkdirSync(fullTargetDirectory);
}

const filesystemService = targetDirectory
    ? new FilesystemService(fullTargetDirectory, false)
    : new MockFilesystemService();

const executorService = targetDirectory
    ? new CommandExecutorService(fullTargetDirectory)
    : new MockCommandExecutorService();

const filesRootPath = path.resolve(__dirname, '..', 'files');

const run = async () => {
    try {
        await runGenerator(filesRootPath, filesystemService, executorService);
    } catch (e) {
        console.log(`❌ [ERROR] An error occured:\n`);
        console.log(e);
    }
};

run();
