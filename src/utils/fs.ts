import fs from 'fs';

export const getFileContent = (fullPath: string) => {
    return fs.readFileSync(fullPath).toString();
};
