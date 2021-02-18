import { start } from "repl";

const isThereVariable = (
    line: string
): {
    result: boolean;
    variables?: string[];
} => {
    var variableArr: string[] = [];
    var result = false;

    for (var i = 0; i < line.length; i++) {}
    if (variableArr.length <= 0) {
        result = true;
    }
    return { result };
};
