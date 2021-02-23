import { Func } from "mocha";
import * as vscode from "vscode";
import vars from "../variables";
import { TextDecoder } from "util";
export default function readFile(
    name: string,
    ext: string,
    errFunc: Function = (message: string): void => {
        console.log(message);
    },
    cb: Function = (data: Uint8Array) => {},
): Promise<string> {
    let fileUri = vscode.Uri.file(vars().wsPath + "/" + name + ext);
    let file = async (): Promise<string> => {
        let fileData: string = "";
        let reader = vscode.workspace.fs.readFile(fileUri);
        await reader.then(
            (data: Uint8Array) => {
                cb(data);
                fileData = new TextDecoder("utf-8").decode(data);
            },
            (err) => {
                errFunc();
                return "";
            },
        );
        return fileData;
    };
    return file();
}
