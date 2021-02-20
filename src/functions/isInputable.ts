import vars from "../variables";

export default function isInputable(
    line: string
): {
    result: boolean;
    types: {
        optional: boolean;
        non_optional: boolean;
    };
} {
    let result: boolean = false;
    let types: {
        optional: boolean;
        non_optional: boolean;
    } = {
        optional: false,
        non_optional: false,
    };
    if (vars().inputSign_regex.test(line)) {
        result = true;
        types.non_optional = true;
    }
    if (vars().optionalInputSign_regex.test(line)) {
        types.optional = true;
    }
    return {
        result,
        types,
    };
}
