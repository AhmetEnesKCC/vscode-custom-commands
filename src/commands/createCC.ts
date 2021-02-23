import * as vscode from "vscode";
import vars from "../variables";
import functions from "../functions/bundle";
import showCC from "./showCC";

export default async function createFile() {
    let wsEdit = new vscode.WorkspaceEdit();
    let fileUri = vscode.Uri.file(
        vars().wsPath + "/" + vars().ccName + vars().ccExtension,
    );
    let new_promise = new Promise(async (resolve, reject) => {
        try {
            await vscode.workspace.fs.stat(fileUri);
            resolve(true);
        } catch {
            reject("File is not exist");
        }
    });
    new_promise
        .then((res) => {
            if (res) {
                vscode.window.showErrorMessage("File already exists");
            }
        })
        .catch((err) => {
            if (err) {
                vscode.workspace.fs.writeFile(fileUri, vars().nullText);
            }
        })
        .then((_) => {
            vscode.window.showTextDocument(fileUri);
            vscode.workspace.applyEdit(wsEdit);
        });

    console.log("POP");
}
