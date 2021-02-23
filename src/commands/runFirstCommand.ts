import * as vscode from "vscode";
import functions from "../functions/bundle";
import vars from "../variables";
import { variableTransformer } from "../functions/shortcutHelpers";
import isInputable from "../functions/isInputable";

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
        onSelect,
    );
    let ifError = (message: string): boolean => {
        continueToExecute = false;

        booleanQuickPick.show();

        return false;
    };
    await functions.readFile(vars().ccName + vars().ccExtension, "", ifError);
    if (continueToExecute) {
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

        let line_text: string = splittedData[0];
        // Add inputable option
        if (functions.isInputable(line_text).result == true) {
            let types_input = await functions.isInputable(line_text).types;
            console.log(types_input);
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
                    .non_optional_changer(line_text)
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
                            newTerminal.sendText(variableTransformer(res.line));
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
    }
}
