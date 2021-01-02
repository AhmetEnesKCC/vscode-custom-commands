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
const bundle_1 = require("../functions/bundle");
function showFile() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bundle_1.default
            .readFile(variables_1.default().ccName + variables_1.default().ccExtension, "")
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            if (res === "") {
                yield bundle_1.default.createFile("cc", variables_1.default().ccName + variables_1.default().ccExtension);
            }
        }));
        let wsEdit = new vscode.WorkspaceEdit();
        // let position = new vscode.Position(4, 2);
        // position.translate(4, 2);
        // position.line === 4;
        // position.character === 2;
        // wsEdit.insert(vscode.Uri.file(vars().wsPath + "/cc"), position, "POP");
        vscode.workspace.applyEdit(wsEdit);
        vscode.window.showTextDocument(vscode.Uri.file(variables_1.default().wsPath + "/" + variables_1.default().ccName + variables_1.default().ccExtension));
    });
}
exports.default = showFile;
//# sourceMappingURL=showCC.js.map