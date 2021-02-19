import { setInterval } from "timers";
import vars from "../variables";
import functions from "./bundle";
import * as vscode from "vscode";
import { resolve } from "dns";

export default async (line: string) => {
    let inputSign_regex_glob = new RegExp(vars().inputSign, "gi");
    let inputSign_regex = new RegExp(vars().inputSign, "i");
    let match_array: string[] = line.match(inputSign_regex_glob);
    let last_index: number = match_array.length - 1;
    await asyncForEach(match_array, async (el, index) => {
        let newBox = await functions.createInputBox(
            `Enter value - ${index + 1}`
        );
        newBox.ignoreFocusOut = true;
        newBox.show();
        await new Promise((resolve) => {
            newBox.onDidAccept((e) => {
                line = line.replace(inputSign_regex, newBox.value);
                newBox.dispose();
                resolve(true);
            });
        });
    });
    return line;
};

const asyncForEach = async (
    array: any[],
    cb: (el: any, index: number) => any
) => {
    for (let index = 0; index < array.length; index++) {
        await cb(array[index], index);
    }
};
