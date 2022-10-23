export interface IFile<T> {
    source: string;
    target: string;
    getReplaceTerms?: (answers: T) => Record<string, string>;
}

export interface IProjectTemplate<T> {
    name: string;
    directoriesToCreate?: string[];
    getFiles: (answers: T) => IFile<T>[];
    askQuestions?: () => Promise<T>;
}

export interface IFilesystemService {
    createDirectory: (relativePath: string) => void;
    saveFile: (relativePath: string, content: string) => void;
};

export interface ICommandExecutor {
    execute: (command: string) => Promise<any>;
};
