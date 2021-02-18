"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const bundle_1 = require("../functions/bundle");
const variables_1 = require("../variables");
const shortcutHelpers_1 = require("../functions/shortcutHelpers");
async function runFirstCommand() {
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
    await bundle_1.default.readFile(variables_1.default().ccName + variables_1.default().ccExtension, "", ifError);
    if (continueToExecute) {
        vscode.commands.executeCommand("workbench.action.focusPanel");
        let fileData = "";
        let splittedData = [];
        async function getSyncData() {
            fileData = await bundle_1.default.readFile(variables_1.default().ccName + variables_1.default().ccExtension, "");
            splittedData = fileData.split("\n");
        }
        await getSyncData();
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
        let terminal_text = "";
        let newBox = await bundle_1.default.createInputBox("Enter value");
        newBox.ignoreFocusOut = true;
        newBox.show();
        // Add inputable option
        // if (functions.isInputable(splittedData[0])) {
        // }
        console.log(shortcutHelpers_1.variableTransformer(splittedData[0]));
        newTerminal.sendText(shortcutHelpers_1.variableTransformer(splittedData[0]));
    }
}
exports.default = runFirstCommand;
//# sourceMappingURL=runFirstCommand.js.map