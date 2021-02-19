import * as vscode from "vscode";
export default function createQuickPick(
    title: string,
    items: vscode.QuickPickItem[],
    onSelect: (item: vscode.QuickPickItem[]) => void
): vscode.QuickPick<vscode.QuickPickItem> {
    let quickPick = vscode.window.createQuickPick();
    quickPick.title = title;
    quickPick.items = items;
    quickPick.onDidChangeSelection(onSelect);
    return quickPick;
}
