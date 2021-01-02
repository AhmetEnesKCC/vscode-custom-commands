"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const variables_1 = require("../variables");
const util_1 = require("util");
function readFile(name, ext, errFunc = (message) => {
    return;
}, cb = (data) => { }) {
    let fileUri = vscode.Uri.file(variables_1.default().wsPath + "/" + name + "/" + ext);
    let file = () => __awaiter(this, void 0, void 0, function* () {
        let fileData = "";
        let reader = vscode.workspace.fs.readFile(fileUri);
        yield reader.then((data) => {
            cb(data);
            fileData = new util_1.TextDecoder("utf-8").decode(data);
        }, (err) => {
            errFunc();
            return "";
        });
        return fileData;
    });
    return file();
}
exports.default = readFile;
//# sourceMappingURL=readFile.js.map