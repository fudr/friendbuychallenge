import { ICommand } from "./commands";

export interface Database {
    execute(command: ICommand): void;
}
