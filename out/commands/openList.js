"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bundle_1 = require("../functions/bundle");
const shortcutHelpers_1 = require("../functions/shortcutHelpers");
const variables_1 = require("../variables");
async function OpenList() {
    let continuteToList = true;
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
        booleanQuickPick.show();
        continuteToList = false;
        return false;
    };
    await bundle_1.default.readFile(variables_1.default().ccName + variables_1.default().ccExtension, "", ifError);
    if (continuteToList) {
        let fileData = "";
        let splittedData = [];
        async function getSyncData() {
            fileData = await bundle_1.default.readFile(variables_1.default().ccName + variables_1.default().ccExtension, "");
            splittedData = fileData.split("\n");
        }
        await getSyncData();
        let lines = [];
        splittedData.map((line) => {
            if (line.trim()) {
                lines.push({ label: line.trim() });
            }
        });
        let onChoose = (item) => {
            let lineNumber = "";
            let newData = [];
            splittedData.map((line) => {
                if (line.trim()) {
                    newData.push(line.trim());
                }
                else {
                    newData.push(line);
                }
            });
            lineNumber = (newData.indexOf(item[0].label.trim()) + 1).toString();
            variables_1.default().terminals.map((term) => {
                if (term.name ===
                    variables_1.default().customTerminalName + " - " + lineNumber) {
                    term.dispose();
                }
            });
            function clearTerminal() {
                let terminalName = variables_1.default().terminalPath.split("\\");
                terminalName = terminalName[terminalName.length - 1].split(".")[0];
                return terminalName;
            }
            let clearCommand = "cls";
            if (clearTerminal() === "cmd") {
                clearCommand = "cls";
            }
            else {
                clearCommand = "clear";
            }
            let newTerminal = variables_1.default().createTerminal(variables_1.default().customTerminalName + " - " + lineNumber, variables_1.default().terminalPath);
            newTerminal.show();
            newTerminal.sendText(clearCommand);
            newTerminal.sendText(shortcutHelpers_1.variableTransformer(item[0].label));
            ListQuickPick.hide();
        };
        let ListQuickPick = bundle_1.default.openQuickPick("Select Command From List", lines, onChoose);
        ListQuickPick.show();
    }
}
exports.default = OpenList;
//# sourceMappingURL=openList.js.map