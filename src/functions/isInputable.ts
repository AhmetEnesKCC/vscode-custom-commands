export default function isInputable(line: string) {
    let result: boolean = false;
    let trimmed_line = line.trim();
    let splittedLine = trimmed_line.split(" ");
    result = splittedLine[trimmed_line.length - 1] == "->" ? true : false;
    return splittedLine;
}
