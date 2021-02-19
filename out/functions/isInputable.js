"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isInputable(line) {
    let result = false;
    if (/->/.test(line)) {
        result = true;
    }
    return result;
}
exports.default = isInputable;
//# sourceMappingURL=isInputable.js.map