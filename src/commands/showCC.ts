import * as vscode from "vscode";
import vars from "../variables";
import functions from "../functions/bundle";
import createCC from "./createCC";

export default async function showFile() {
    let wsEdit = new vscode.WorkspaceEdit();

    let filePath = vars().wsPath + "/" + vars().ccName + vars().ccExtension;
    let fileUri = vscode.Uri.file(filePath);
    let new_promise = new Promise(async (resolve, reject) => {
        try {
            await vscode.workspace.fs.stat(fileUri);
            resolve(true);
            vscode.window.showTextDocument(fileUri);
            vscode.workspace.applyEdit(wsEdit);
        } catch {
            reject("File is not exists");
        }
    });
    new_promise
        .then((res) => {
            if (res) {
                vscode.window.showTextDocument(fileUri);
                vscode.workspace.applyEdit(wsEdit);
            }
        })
        .catch((err) => {
            createCC();
        });
}
