import * as vscode from "vscode";
import vars from "../variables";
import functions from "../functions/bundle";

export default async function showFile() {
    await functions
        .readFile(vars().ccName + vars().ccExtension, "")
        .then(async (res) => {
            if (res === "") {
                await functions.createFile(
                    "cc",
                    vars().ccName + vars().ccExtension
                );
            }
        });
    let wsEdit = new vscode.WorkspaceEdit();
    // let position = new vscode.Position(4, 2);
    // position.translate(4, 2);
    // position.line === 4;
    // position.character === 2;
    // wsEdit.insert(vscode.Uri.file(vars().wsPath + "/cc"), position, "POP");
    vscode.workspace.applyEdit(wsEdit);

    vscode.window.showTextDocument(
        vscode.Uri.file(
            vars().wsPath + "/" + vars().ccName + vars().ccExtension
        )
    );
}
