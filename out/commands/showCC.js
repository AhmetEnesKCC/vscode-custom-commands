"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const variables_1 = require("../variables");
const bundle_1 = require("../functions/bundle");
async function showFile() {
    await bundle_1.default
        .readFile(variables_1.default().ccName + variables_1.default().ccExtension, "")
        .then(async (res) => {
        if (res === "") {
            await bundle_1.default.createFile("cc", variables_1.default().ccName + variables_1.default().ccExtension);
        }
    });
    let wsEdit = new vscode.WorkspaceEdit();
    // let position = new vscode.Position(4, 2);
    // position.translate(4, 2);
    // position.line === 4;
    // position.character === 2;
    // wsEdit.insert(vscode.Uri.file(vars().wsPath + "/cc"), position, "POP");
    vscode.workspace.applyEdit(wsEdit);
    vscode.window.showTextDocument(vscode.Uri.file(variables_1.default().wsPath + "/" + variables_1.default().ccName + variables_1.default().ccExtension));
}
exports.default = showFile;
//# sourceMappingURL=showCC.js.map