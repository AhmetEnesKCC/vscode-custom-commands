"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional_changer = exports.non_optional_changer = void 0;
const variables_1 = require("../variables");
const bundle_1 = require("./bundle");
const vscode = require("vscode");
let broken = false;
let cancelled = true;
const variableGenerator = () => {
    broken = false;
    cancelled = true;
};
const non_optional_changer = async (line) => {
    variableGenerator();
    let match_nonoptional = line.match(variables_1.default().inputSign_regex_glob);
    let acceptedNonOptionalInputs = 0;
    await asyncForEach(match_nonoptional, async (el, index) => {
        let newBox = await bundle_1.default.createInputBox(`Enter Non optional value - ${index + 1}`);
        newBox.ignoreFocusOut = true;
        newBox.show();
        let conflictProtector = false;
        await new Promise(async (resolve, reject) => {
            newBox.onDidAccept((e) => {
                conflictProtector = true;
                if (newBox.value == "") {
                    vscode.window.showWarningMessage("Please enter a value");
                }
                else {
                    line = line.replace(variables_1.default().inputSign_regex, newBox.value);
                    newBox.dispose();
                    acceptedNonOptionalInputs++;
                    resolve(true);
                }
            });
            newBox.onDidHide((e) => {
                setTimeout(() => {
                    if (conflictProtector == true) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }, 500);
            });
        }).then((res) => {
            if (res == false) {
                broken = true;
            }
        });
    });
    if (acceptedNonOptionalInputs == match_nonoptional.length) {
        cancelled = false;
    }
    else {
        vscode.window.showWarningMessage(variables_1.default().cancelled_input);
    }
    return { line: line, cancelled: cancelled };
};
exports.non_optional_changer = non_optional_changer;
const optional_changer = async (line) => {
    let match_optional = line.match(variables_1.default().optionalInputSign_regex_glob);
    await asyncForEach(match_optional, async (el, index) => {
        let newBox = await bundle_1.default.createInputBox(`Enter optional value - ${index + 1}`);
        newBox.ignoreFocusOut = true;
        newBox.show();
        await new Promise(async (resolve, reject) => {
            newBox.onDidAccept((e) => {
                line = line.replace(variables_1.default().optionalInputSign_regex, newBox.value);
                newBox.dispose();
                resolve(true);
            });
            newBox.onDidHide((e) => {
                if (newBox.value == "") {
                    line = line.replace(variables_1.default().optionalInputSign_regex, "");
                }
                resolve(true);
            });
        });
    });
    return {
        line,
    };
};
exports.optional_changer = optional_changer;
const asyncForEach = async (array, cb) => {
    for (let index = 0; index < array.length; index++) {
        if (broken === true) {
            break;
        }
        await cb(array[index], index);
    }
};
//# sourceMappingURL=changeInputvariable.js.map