"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = require("../variables");
function isInputable(line) {
    let result = false;
    let types = {
        optional: false,
        non_optional: false,
    };
    if (variables_1.default().inputSign_regex.test(line)) {
        result = true;
        types.non_optional = true;
    }
    if (variables_1.default().optionalInputSign_regex.test(line)) {
        result = true;
        types.optional = true;
    }
    return {
        result,
        types,
    };
}
exports.default = isInputable;
//# sourceMappingURL=isInputable.js.map