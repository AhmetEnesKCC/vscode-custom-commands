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
    const Run_First_Command = () => __awaiter(this, void 0, void 0, function* () {
        runFirstCommand_1.default();
    });
    const Select_From_List_Func = (name = "runc") => __awaiter(this, void 0, void 0, function* () {
        // Get The Terminal Names
        openList_1.default();
    });
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