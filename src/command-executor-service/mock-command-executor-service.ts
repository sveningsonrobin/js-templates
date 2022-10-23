import { ICommandExecutor } from '../types';
import { fontDim } from '../utils';

export class MockCommandExecutorService implements ICommandExecutor {
    async execute(command: string) {
        console.log(`Run command: ${fontDim(command)}`);
    };
}
