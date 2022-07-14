import { IStore } from "./storage";

export interface ICommand {
  apply(store:IStore): void;
  revert(store:IStore):void;
}

export class SetCommand implements ICommand {
  readonly name: string;
  readonly value: string;
  private previousValue: string;
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  apply(store:IStore): void {
    this.previousValue = store.get(this.name);
    store.set(this.name,this.value)
  }
  revert(store:IStore): void {
    store.set(this.name,this.previousValue)
  }
}

export class GetCommand implements ICommand {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  apply(store:IStore): void {

  }
  revert(store:IStore): void {}
}

export class UnsetCommand implements ICommand {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  apply(store:IStore): void {
    store.set(this.name,undefined)
  }
  revert(store:IStore): void {}
}

export class NumEqualToCommand implements ICommand {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
  }

  apply(store:IStore): void {}
  revert(store:IStore): void {}
}

export class BeginCommand implements ICommand {
  apply(store:IStore): void {}
  revert(store:IStore): void {}
}

export class RollbackCommand implements ICommand {
  apply(store:IStore): void {}
  revert(store:IStore): void {}
}

export class CommitCommand implements ICommand {
  apply(store:IStore): void {}
  revert(store:IStore): void {}
}
