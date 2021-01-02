"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function createQuickPick(title, items, onSelect) {
    let quickPick = vscode.window.createQuickPick();
    quickPick.title = title;
    quickPick.items = items;
    quickPick.onDidChangeSelection(onSelect);
    return quickPick;
}
exports.default = createQuickPick;
//# sourceMappingURL=openQuickPick.js.map