import { IFilesystemService } from '../types';
import { fontDim } from '../utils';

export class MockFilesystemService implements IFilesystemService {
    createDirectory(fullPath: string) {
        console.log(`Create directory: ${fullPath}`)
    }

    saveFile(fullPath: string, content: string) {
        const formattedContent = fontDim(content);
        console.log(`\nFile "${fullPath}":\n${formattedContent}\n`);
    }
};
