"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntext = exports.definer = void 0;
const variables_1 = require("../variables");
exports.definer = (line) => {
    let splittedLine = line.split(" ");
    let newLineArr = [];
    for (var i = 0; i < splittedLine.length; i++) {
        if (splittedLine[i].trim() === "$fn") {
            newLineArr.push(variables_1.default().fileNameWithExtension);
        }
        else if (splittedLine[i].trim() === "$fnw") {
            newLineArr.push(variables_1.default().fileNameWithoutExtension);
        }
        else if (splittedLine[i].trim() === "$fon") {
            newLineArr.push(variables_1.default().fileFolder);
        }
        else {
            newLineArr.push(splittedLine[i]);
        }
    }
    setTimeout(() => { }, 1000);
    return newLineArr.join(" ");
};
exports.getIntext = (line) => {
    let pathMode = false;
    let newLinedArr = [];
    let splittedLine = line.split(" ");
    splittedLine.forEach((ch) => {
        if (ch.match("/")) {
            let splittedCh = ch.split("/");
            let newSplittedArr = [];
            splittedCh.forEach((sch) => {
                if (sch.trim() === "$fn") {
                    newSplittedArr.push(variables_1.default().fileNameWithExtension);
                }
                else if (sch.trim() === "$fnw") {
                    newSplittedArr.push(variables_1.default().fileNameWithoutExtension);
                }
                else if (sch.trim() === "$fon") {
                    newSplittedArr.push(variables_1.default().fileFolder);
                }
                else if (sch.trim() === '$fn"') {
                    newSplittedArr.push(variables_1.default().fileNameWithExtension + '"');
                }
                else if (sch.trim() === '$fnw"') {
                    newSplittedArr.push(variables_1.default().fileNameWithoutExtension + '"');
                }
                else if (sch.trim() === '$fon"') {
                    newSplittedArr.push(variables_1.default().fileFolder + '"');
                }
                else {
                    newSplittedArr.push(sch);
                }
            });
            newLinedArr.push(newSplittedArr.join("/"));
        }
        else {
            newLinedArr.push(ch);
        }
    });
    return newLinedArr.join(" ");
};
const rewriter = () => { };
//# sourceMappingURL=shortcutHelpers.js.map