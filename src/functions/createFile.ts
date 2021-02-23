import * as vscode from "vscode";
import vars from "../variables";

export default async function createFile(
    name: string,
    ext: string,
): Promise<void> {
    let fileUri = vscode.Uri.file(vars().wsPath + "/" + name + ext);
    await vscode.workspace.fs.writeFile(fileUri, vars().nullText);
    vscode.workspace.applyEdit(vars().wsEdit);
    vscode.window.showTextDocument(fileUri);
}
