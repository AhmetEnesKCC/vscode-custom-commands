"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function createInputBox(placeholder) {
    let newInputBox = vscode.window.createInputBox();
    if (placeholder) {
        newInputBox.placeholder = placeholder;
    }
    return newInputBox;
}
exports.default = createInputBox;
//# sourceMappingURL=createInputBox.js.map