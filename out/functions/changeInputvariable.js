"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = require("../variables");
const bundle_1 = require("./bundle");
exports.default = async (line) => {
    let inputSign_regex_glob = new RegExp(variables_1.default().inputSign, "gi");
    let inputSign_regex = new RegExp(variables_1.default().inputSign, "i");
    let match_array = line.match(inputSign_regex_glob);
    let last_index = match_array.length - 1;
    await asyncForEach(match_array, async (el, index) => {
        let newBox = await bundle_1.default.createInputBox(`Enter value - ${index + 1}`);
        newBox.ignoreFocusOut = true;
        newBox.show();
        await new Promise((resolve) => {
            newBox.onDidHide((e) => {
                line = line.replace(inputSign_regex, "");
                resolve(false);
            });
            newBox.onDidAccept((e) => {
                line = line.replace(inputSign_regex, newBox.value);
                newBox.dispose();
                resolve(true);
            });
        });
    });
    return line;
};
const asyncForEach = async (array, cb) => {
    for (let index = 0; index < array.length; index++) {
        await cb(array[index], index);
    }
};
//# sourceMappingURL=changeInputvariable.js.map