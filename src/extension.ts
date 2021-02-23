import * as vscode from "vscode";
import { TextDecoder } from "util";
import vars from "./variables";
import run_first_command from "./commands/runFirstCommand";
import open_list_command from "./commands/openList";
import functions from "./functions/bundle";
import showCC from "./commands/showCC";
import createCC from "./commands/createCC";
export function activate(context: vscode.ExtensionContext) {
    // Get the custom commands from user;
    // Create button to run custom command

    // STATUSBAR ITEM
    // create

    var custom_command_button = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        999,
    );

    // properties

    custom_command_button.text = "$(run-all)";
    custom_command_button.tooltip = "Click to run first-command";
    custom_command_button.command = "custom_commands.run";
    custom_command_button.show();

    // Create cc.md File

    // COMMAND

    const runCommand = "custom_commands.run";

    const selectCommand = "custom_commands.list";

    // file create command

    const fileCreateCommand = "custom_commands.create";

    // Select From List

    const showCommand = "custom_commands.show";

    // run Command

    const Run_First_Command = async () => {
        run_first_command();
    };

    const Select_From_List_Func = async (name: string = "runc") => {
        // Get The Terminal Names
        open_list_command();
    };
    // Task
    // SUBSCRIBE TO COMMANDS

    context.subscriptions.push(
        vscode.commands.registerCommand(runCommand, Run_First_Command),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(selectCommand, Select_From_List_Func),
    );
    context.subscriptions.push(
        vscode.commands.registerCommand(fileCreateCommand, createCC),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(showCommand, showCC),
    );
}

export function deactivate() {}
