import * as vscode from "vscode";
import functions from "../functions/bundle";
import { variableTransformer } from "../functions/shortcutHelpers";
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
        onSelect,
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
                "",
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
        let onChoose = async (item: vscode.QuickPickItem[]) => {
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
                    ".",
                )[0];
                return terminalName;
            }
            let clearCommand: "cls" | "clear" = "cls";
            if (clearTerminal() === "cmd") {
                clearCommand = "cls";
            } else {
                clearCommand = "clear";
            }
            let line_text: string = item[0].label;
            if (functions.isInputable(line_text).result == true) {
                let types_input = await functions.isInputable(line_text).types;
                if (
                    types_input.non_optional === true &&
                    types_input.optional === true
                ) {
                    await functions
                        .non_optional_changer(line_text)
                        .then(async (res) => {
                            if (res.cancelled == true) {
                                return;
                            }

                            await functions
                                .optional_changer(res.line)
                                .then((new_res) => {
                                    vscode.commands.executeCommand(
                                        "workbench.action.focusPanel",
                                    );
                                    let newTerminal: vscode.Terminal = vars().createTerminal(
                                        vars().customTerminalName + " - 1",
                                        vars().terminalPath,
                                    );
                                    newTerminal.show();
                                    newTerminal.sendText(clearCommand);
                                    newTerminal.sendText(
                                        variableTransformer(new_res.line),
                                    );
                                });
                        });
                } else if (
                    types_input.non_optional === true &&
                    types_input.optional === false
                ) {
                    await functions
                        .optional_changer(line_text)
                        .then((res: { cancelled: boolean; line: string }) => {
                            if (res.cancelled === true) {
                                return;
                            } else if (res.cancelled === false) {
                                vscode.commands.executeCommand(
                                    "workbench.action.focusPanel",
                                );
                                let newTerminal: vscode.Terminal = vars().createTerminal(
                                    vars().customTerminalName + " - 1",
                                    vars().terminalPath,
                                );
                                newTerminal.show();
                                newTerminal.sendText(clearCommand);
                                newTerminal.sendText(
                                    variableTransformer(res.line),
                                );
                            }
                        });
                } else if (
                    types_input.non_optional === false &&
                    types_input.optional === true
                ) {
                    await functions
                        .optional_changer(line_text)
                        .then((res: { line: string }) => {
                            vscode.commands.executeCommand(
                                "workbench.action.focusPanel",
                            );
                            let newTerminal: vscode.Terminal = vars().createTerminal(
                                vars().customTerminalName + " - 1",
                                vars().terminalPath,
                            );
                            newTerminal.show();
                            newTerminal.sendText(clearCommand);
                            newTerminal.sendText(variableTransformer(res.line));
                        });
                }
            } else {
                vscode.commands.executeCommand("workbench.action.focusPanel");
                let newTerminal: vscode.Terminal = vars().createTerminal(
                    vars().customTerminalName + " - 1",
                    vars().terminalPath,
                );
                newTerminal.show();
                newTerminal.sendText(clearCommand);
                newTerminal.sendText(variableTransformer(line_text));
            }
            ListQuickPick.hide();
        };
        let ListQuickPick = functions.openQuickPick(
            "Select Command From List",
            lines,
            onChoose,
        );
        ListQuickPick.show();
    }
}
