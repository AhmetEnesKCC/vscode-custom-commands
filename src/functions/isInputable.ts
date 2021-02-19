export default function isInputable(line: string) {
    let result: boolean = false;
    if (/->/.test(line)) {
        result = true;
    }
    return result;
}
