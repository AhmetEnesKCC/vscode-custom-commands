import { setInterval } from "timers";
import vars from "../variables";
import functions from "./bundle";
import * as vscode from "vscode";

let broken: boolean = false;
let cancelled: boolean = true;

const variableGenerator = () => {
    broken = false;
    cancelled = true;
};

export const non_optional_changer = async (
    line: string,
): Promise<{ line: string; cancelled: boolean }> => {
    variableGenerator();

    let match_nonoptional: string[] = line.match(vars().inputSign_regex_glob);

    let acceptedNonOptionalInputs: number = 0;
    await asyncForEach(match_nonoptional, async (el, index) => {
        let newBox = await functions.createInputBox(
            `Enter Non optional value - ${index + 1}`,
        );
        newBox.ignoreFocusOut = true;
        newBox.show();
        let conflictProtector: boolean = false;
        await new Promise(async (resolve, reject) => {
            newBox.onDidAccept((e) => {
                conflictProtector = true;
                if (newBox.value == "") {
                    vscode.window.showWarningMessage("Please enter a value");
                } else {
                    line = line.replace(vars().inputSign_regex, newBox.value);
                    newBox.dispose();
                    acceptedNonOptionalInputs++;
                    resolve(true);
                }
            });
            newBox.onDidHide((e) => {
                setTimeout(() => {
                    if (conflictProtector == true) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }, 500);
            });
        }).then((res: boolean) => {
            if (res == false) {
                broken = true;
            }
        });
    });
    if (acceptedNonOptionalInputs == match_nonoptional.length) {
        cancelled = false;
    } else {
        vscode.window.showWarningMessage(vars().cancelled_input);
    }

    return { line: line, cancelled: cancelled };
};

export const optional_changer = async (
    line: string,
): Promise<{ line: string }> => {
    let match_optional: string[] = line.match(
        vars().optionalInputSign_regex_glob,
    );

    await asyncForEach(match_optional, async (el: any, index: number) => {
        let newBox = await functions.createInputBox(
            `Enter optional value - ${index + 1}`,
        );
        newBox.ignoreFocusOut = true;
        newBox.show();
        await new Promise(async (resolve, reject) => {
            newBox.onDidAccept((e) => {
                line = line.replace(
                    vars().optionalInputSign_regex,
                    newBox.value,
                );
                newBox.dispose();
                resolve(true);
            });
            newBox.onDidHide((e) => {
                if (newBox.value == "") {
                    line = line.replace(vars().optionalInputSign_regex, "");
                }
                resolve(true);
            });
        });
    });
    return {
        line,
    };
};

const asyncForEach = async (
    array: any[],
    cb: (el: any, index: number) => any,
) => {
    for (let index = 0; index < array.length; index++) {
        if (broken === true) {
            break;
        }
        await cb(array[index], index);
    }
};
