import { BeginCommand, CommitCommand, ICommand, RollbackCommand, GetCommand, NumEqualToCommand, UnsetCommand } from "./commands";
import { Database } from "./Database";
import { IStore, Store } from "./storage";

class InMemoryDatabase implements Database {
    private store: IStore = new Store();
    private commandStack: ICommand[] = [];

    execute(command: ICommand): string | number | undefined {

        if(command  instanceof GetCommand){
            return this.store.get((command as GetCommand).name)
        }

        if(command  instanceof NumEqualToCommand){
            return this.store.count((command as NumEqualToCommand).value)
        }

        if(command  instanceof BeginCommand){
            this.commandStack.push(command)
            return;
        }
        
        if(command  instanceof RollbackCommand){
            if(!this.commandStack.length) throw new Error("NO TRANSACTION")
            
            while(this.commandStack.length){
                const cmd = this.commandStack.pop();
                if(cmd instanceof UnsetCommand) {
                    //this.store.set(cmd.name,this.store.value)
                }
                if(cmd instanceof BeginCommand) return;
                cmd.revert(this.store)
                //command.apply(this.store);
            }
            return;
        }
        
        if(command  instanceof CommitCommand){
            if(!this.commandStack.length) throw new Error("NO TRANSACTION")

            while(this.commandStack.length){
                const cmd = this.commandStack.pop();
                if(cmd instanceof BeginCommand) return;
            }
            return;
        }

        command.apply(this.store);
        if(this.commandStack.length){
            this.commandStack.push(command)
        }
    }
    
}

const database = new InMemoryDatabase();

export default database;