"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const variables_1 = require("../variables");
async function createFile(name, ext) {
    let fileUri = vscode.Uri.file(variables_1.default().wsPath + "/" + name + "/" + ext);
    let file = await vscode.workspace.fs.writeFile(fileUri, variables_1.default().nullText);
    vscode.workspace.applyEdit(variables_1.default().wsEdit);
    vscode.window.showTextDocument(fileUri);
}
exports.default = createFile;
//# sourceMappingURL=createFile.js.map