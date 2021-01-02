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
const bundle_1 = require("../functions/bundle");
const variables_1 = require("../variables");
const shortcutHelpers_1 = require("../functions/shortcutHelpers");
function runFirstCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        let continueToExecute = true;
        let items = [];
        let onSelect = (item) => {
            if (item[0].label === "YES") {
                bundle_1.default.createFile(variables_1.default().ccName + variables_1.default().ccExtension, "");
            }
            booleanQuickPick.hide();
        };
        items.push({ label: "YES" }, { label: "NO" });
        let booleanQuickPick = bundle_1.default.openQuickPick("Create custom_commands file?", items, onSelect);
        let ifError = (message) => {
            continueToExecute = false;
            booleanQuickPick.show();
            return false;
        };
        yield bundle_1.default.readFile(variables_1.default().ccName + variables_1.default().ccExtension, "", ifError);
        if (continueToExecute) {
            vscode.commands.executeCommand("workbench.action.focusPanel");
            let fileData = "";
            let splittedData = [];
            function getSyncData() {
                return __awaiter(this, void 0, void 0, function* () {
                    fileData = yield bundle_1.default.readFile(variables_1.default().ccName + variables_1.default().ccExtension, "");
                    splittedData = fileData.split("\n");
                });
            }
            yield getSyncData();
            let teminalIdByCommand = splittedData[0].toUpperCase();
            variables_1.default().terminals.map((term) => {
                if (term.name === variables_1.default().customTerminalName + " - 1") {
                    term.dispose();
                }
            });
            function clearTerminal() {
                let terminalName = variables_1.default().terminalPath.split("\\");
                terminalName = terminalName[terminalName.length - 1].split(".")[0];
                return terminalName;
            }
            let clearCommand;
            if (clearTerminal() === "cmd") {
                clearCommand = "cls";
            }
            else {
                clearCommand = "clear";
            }
            let newTerminal = variables_1.default().createTerminal(variables_1.default().customTerminalName + " - 1", variables_1.default().terminalPath);
            newTerminal.show();
            newTerminal.sendText(clearCommand);
            newTerminal.sendText(shortcutHelpers_1.getIntext(shortcutHelpers_1.definer(splittedData[0])));
        }
    });
}
exports.default = runFirstCommand;
//# sourceMappingURL=runFirstCommand.js.map