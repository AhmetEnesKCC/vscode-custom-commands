"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const variables_1 = require("../variables");
const createCC_1 = require("./createCC");
async function showFile() {
    let wsEdit = new vscode.WorkspaceEdit();
    let filePath = variables_1.default().wsPath + "/" + variables_1.default().ccName + variables_1.default().ccExtension;
    let fileUri = vscode.Uri.file(filePath);
    let new_promise = new Promise(async (resolve, reject) => {
        try {
            await vscode.workspace.fs.stat(fileUri);
            resolve(true);
            vscode.window.showTextDocument(fileUri);
            vscode.workspace.applyEdit(wsEdit);
        }
        catch {
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
        createCC_1.default();
    });
}
exports.default = showFile;
//# sourceMappingURL=showCC.js.map