import * as vscode from "vscode";
import functions from "../functions/bundle";
import vars from "../variables";
import { definer, getIntext } from "../functions/shortcutHelpers";

export default async function runFirstCommand(): Promise<void> {
    let continueToExecute: boolean = true;
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
        continueToExecute = false;

        booleanQuickPick.show();

        return false;
    };
    await functions.readFile(vars().ccName + vars().ccExtension, "", ifError);
    if (continueToExecute) {
        vscode.commands.executeCommand("workbench.action.focusPanel");
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

        let teminalIdByCommand = splittedData[0].toUpperCase();

        vars().terminals.map((term: vscode.Terminal) => {
            if (term.name === vars().customTerminalName + " - 1") {
                term.dispose();
            }
        });

        function clearTerminal() {
            let terminalName: string = vars().terminalPath.split("\\");
            terminalName = terminalName[terminalName.length - 1].split(".")[0];
            return terminalName;
        }
        let clearCommand: "cls" | "clear";
        if (clearTerminal() === "cmd") {
            clearCommand = "cls";
        } else {
            clearCommand = "clear";
        }

        let newTerminal: vscode.Terminal = vars().createTerminal(
            vars().customTerminalName + " - 1",
            vars().terminalPath
        );
        newTerminal.show();
        newTerminal.sendText(clearCommand);
        newTerminal.sendText(getIntext(definer(splittedData[0])));
    }
}
