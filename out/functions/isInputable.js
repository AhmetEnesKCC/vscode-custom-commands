"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isInputable(line) {
    let result = false;
    let trimmed_line = line.trim();
    let splittedLine = trimmed_line.split(" ");
    result = splittedLine[trimmed_line.length - 1] == "->" ? true : false;
    return splittedLine;
}
exports.default = isInputable;
//# sourceMappingURL=isInputable.js.map