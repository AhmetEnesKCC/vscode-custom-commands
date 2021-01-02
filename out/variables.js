"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
let refreshedVariables = () => {
    var _a, _b, _c, _d;
    const activeFileName = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName.split("\\")[((_b = vscode.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.document.fileName.split("\\").length) - 1];
    const activeFileFolder = (_c = vscode.window.activeTextEditor) === null || _c === void 0 ? void 0 : _c.document.fileName.split("\\")[((_d = vscode.window.activeTextEditor) === null || _d === void 0 ? void 0 : _d.document.fileName.split("\\").length) - 2];
    const fileNameWithoutExtension = activeFileName === null || activeFileName === void 0 ? void 0 : activeFileName.split(".")[0];
    const fileExtension = activeFileName === null || activeFileName === void 0 ? void 0 : activeFileName.split(".")[1];
    const fileNameWithExtension = activeFileName;
    const fileFolder = activeFileFolder;
    const wsEdit = new vscode.WorkspaceEdit();
    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const nullText = new Uint8Array([]);
    let fileData = "";
    const terminals = vscode.window.terminals;
    const terminalPath = vscode.workspace
        .getConfiguration("terminal")
        .get("integrated.shell.windows");
    const activeTerminal = vscode.window.activeTerminal;
    const createTerminal = (name, path) => {
        return vscode.window.createTerminal(name, path);
    };
    const ccName = "custom_commands";
    const ccExtension = ".txt";
    const customTerminalName = "line";
    return {
        fileNameWithExtension,
        fileNameWithoutExtension,
        fileExtension,
        fileFolder,
        nullText,
        wsPath,
        wsEdit,
        fileData,
        terminals,
        terminalPath,
        activeTerminal,
        createTerminal,
        ccName,
        ccExtension,
        customTerminalName,
    };
};
exports.default = refreshedVariables;
//# sourceMappingURL=variables.js.map