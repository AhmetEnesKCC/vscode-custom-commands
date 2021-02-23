"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const variables_1 = require("../variables");
async function createFile() {
    let wsEdit = new vscode.WorkspaceEdit();
    let fileUri = vscode.Uri.file(variables_1.default().wsPath + "/" + variables_1.default().ccName + variables_1.default().ccExtension);
    let new_promise = new Promise(async (resolve, reject) => {
        try {
            await vscode.workspace.fs.stat(fileUri);
            resolve(true);
        }
        catch {
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
            vscode.workspace.fs.writeFile(fileUri, variables_1.default().nullText);
        }
    })
        .then((_) => {
        vscode.window.showTextDocument(fileUri);
        vscode.workspace.applyEdit(wsEdit);
    });
    console.log("POP");
}
exports.default = createFile;
//# sourceMappingURL=createCC.js.map