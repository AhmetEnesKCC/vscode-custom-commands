"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const variables_1 = require("../variables");
const util_1 = require("util");
function readFile(name, ext, errFunc = (message) => {
    return;
}, cb = (data) => { }) {
    let fileUri = vscode.Uri.file(variables_1.default().wsPath + "/" + name + "/" + ext);
    let file = async () => {
        let fileData = "";
        let reader = vscode.workspace.fs.readFile(fileUri);
        await reader.then((data) => {
            cb(data);
            fileData = new util_1.TextDecoder("utf-8").decode(data);
        }, (err) => {
            errFunc();
            return "";
        });
        return fileData;
    };
    return file();
}
exports.default = readFile;
//# sourceMappingURL=readFile.js.map