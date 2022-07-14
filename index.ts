import * as lineR from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import database from "./db";
import {NumEqualToCommand, RollbackCommand, SetCommand, UnsetCommand,  BeginCommand, CommitCommand, GetCommand } from "./commands";

type RL = lineR.Interface;
type ReadCommand = (rl: RL) => (command: string) => void;

const readCommand: ReadCommand = (resp) => (command) => {
  if (command.toUpperCase() === "END") {
    resp.close();
  }


  if (command.toUpperCase().startsWith("SET")) {
    let varN = command.toUpperCase().replace("SET", "").split(" ")[1]
    let varV = command.toUpperCase().replace("SET", "").split(" ")[2]
    database.execute(new SetCommand(varN,varV))
  }

  if (command.toUpperCase().startsWith("GET")) {
    let varN = command.toUpperCase().replace("SET", "").split(" ")[1]
    let respo = database.execute(new GetCommand(varN))
    if(respo == undefined) respo = "NULL"
    console.log(respo)
  }

  if (command.toUpperCase().startsWith("UNSET")) {
    let varN = command.toUpperCase().replace("SET", "").split(" ")[1]
    database.execute(new UnsetCommand(varN))
  }
  if (command.toUpperCase().startsWith("NUMEQUALTO")) {
    let varV = command.toUpperCase().replace("NUMEQUALTO", "").split(" ")[1]
    let respo = database.execute(new NumEqualToCommand(varV))
    if(respo == undefined) respo = "0"
    console.log(respo)
  }
  if (command.toUpperCase().startsWith("BEGIN")) {
    database.execute(new BeginCommand())
  }
  if (command.toUpperCase().startsWith("ROLLBACK")) {
    let res = database.execute(new RollbackCommand())

    console.log(res)
  }
  if (command.toUpperCase().startsWith("COMMIT")) {
    let res = database.execute(new CommitCommand())

    console.log(res)
  }

};

const resp = lineR.createInterface({ input, output });

console.log("Write here:");

resp.on("line", readCommand(resp));