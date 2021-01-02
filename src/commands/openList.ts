import * as vscode from "vscode";
import functions from "../functions/bundle";
import { definer, getIntext } from "../functions/shortcutHelpers";
import vars from "../variables";

export default async function OpenList(): Promise<void> {
    let continuteToList: boolean = true;
    let items: vscode.QuickPickItem[] = [];

    let onSelect = (item: vscode.QuickPickItem[]) => {
        if (item[0].label === "YES") {
            functions.createFile(vars().ccName + vars().ccExtension, "");
        }
        booleanQuickPick.hide();
    };

    items.push({ label: "YES" }, { label: "NO" });
    let booleanQuickPick = functions.openQuickPick(
        "Create custom_commands file?",
        items,
        onSelect
    );
    let ifError = (message: string): boolean => {
        booleanQuickPick.show();
        continuteToList = false;

        return false;
    };
    await functions.readFile(vars().ccName + vars().ccExtension, "", ifError);
    if (continuteToList) {
        let fileData: string = "";
        let splittedData: string[] = [];
        async function getSyncData() {
            fileData = await functions.readFile(
                vars().ccName + vars().ccExtension,
                ""
            );
            splittedData = fileData.split("\n");
        }
        await getSyncData();
        let lines: vscode.QuickPickItem[] = [];
        splittedData.map((line: string) => {
            if (line.trim()) {
                lines.push({ label: line.trim() });
            }
        });
        let onChoose = (item: vscode.QuickPickItem[]) => {
            let lineNumber: string = "";
            let newData: string[] = [];
            splittedData.map((line: string) => {
                if (line.trim()) {
                    newData.push(line.trim());
                } else {
                    newData.push(line);
                }
            });
            lineNumber = (newData.indexOf(item[0].label.trim()) + 1).toString();

            vars().terminals.map((term: vscode.Terminal) => {
                if (
                    term.name ===
                    vars().customTerminalName + " - " + lineNumber
                ) {
                    term.dispose();
                }
            });
            function clearTerminal() {
                let terminalName: string = vars().terminalPath.split("\\");
                terminalName = terminalName[terminalName.length - 1].split(
                    "."
                )[0];
                return terminalName;
            }
            let clearCommand: "cls" | "clear" = "cls";
            if (clearTerminal() === "cmd") {
                clearCommand = "cls";
            } else {
                clearCommand = "clear";
            }
            let newTerminal = vars().createTerminal(
                vars().customTerminalName + " - " + lineNumber,
                vars().terminalPath
            );
            newTerminal.show();
            newTerminal.sendText(clearCommand);
            newTerminal.sendText(getIntext(definer(item[0].label)));
            ListQuickPick.hide();
        };
        let ListQuickPick = functions.openQuickPick(
            "Select Command From List",
            lines,
            onChoose
        );
        ListQuickPick.show();
    }
}
