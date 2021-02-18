"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const runFirstCommand_1 = require("./commands/runFirstCommand");
const openList_1 = require("./commands/openList");
const bundle_1 = require("./functions/bundle");
const showCC_1 = require("./commands/showCC");
function activate(context) {
    // Get the custom commands from user;
    // Create button to run custom command
    // STATUSBAR ITEM
    // create
    var custom_command_button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 999);
    // properties
    custom_command_button.text = "$(run-all)";
    custom_command_button.tooltip = "Click to run custom command";
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
        runFirstCommand_1.default();
    };
    const Select_From_List_Func = async (name = "runc") => {
        // Get The Terminal Names
        openList_1.default();
    };
    // Task
    // SUBSCRIBE TO COMMANDS
    context.subscriptions.push(vscode.commands.registerCommand(runCommand, Run_First_Command));
    context.subscriptions.push(vscode.commands.registerCommand(selectCommand, Select_From_List_Func));
    context.subscriptions.push(vscode.commands.registerCommand(fileCreateCommand, bundle_1.default.createFile.bind(null, "cc", "")));
    context.subscriptions.push(vscode.commands.registerCommand(showCommand, showCC_1.default));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map