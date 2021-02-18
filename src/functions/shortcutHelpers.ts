import variables from "../variables";
type typeOfS = "fnw" | "fn" | "fon" | "fp";

// OLD WAY

// export const definer = (line: string): string => {
//     let splittedLine: Array<string> = line.split(" ");
//     let newLineArr: string[] = [];
//     for (var i = 0; i < splittedLine.length; i++) {
//         if (splittedLine[i].trim() === "$fn") {
//             newLineArr.push(variables().fileNameWithExtension!);
//         } else if (splittedLine[i].trim() === "$fnw") {
//             newLineArr.push(variables().fileNameWithoutExtension!);
//         } else if (splittedLine[i].trim() === "$fon") {
//             newLineArr.push(variables().fileFolder!);
//         } else {
//             newLineArr.push(splittedLine[i]);
//         }
//     }

//     setTimeout(() => {}, 1000);
//     return newLineArr.join(" ");
// };

// export const getIntext = (line: string): string => {
//     let newLinedArr: string[] = [];
//     let splittedLine: Array<string> = line.split(" ");

//     splittedLine.forEach((ch) => {
//         if (ch.match("/")) {
//             let splittedCh: string[] = ch.split("/");
//             let newSplittedArr: any = [];
//             splittedCh.forEach((sch: string) => {
//                 if (sch.trim() === "$fn") {
//                     newSplittedArr.push(variables().fileNameWithExtension!);
//                 } else if (sch.trim() === "$fnw") {
//                     newSplittedArr.push(variables().fileNameWithoutExtension!);
//                 } else if (sch.trim() === "$fon") {
//                     newSplittedArr.push(variables().fileFolder!);
//                 } else if (sch.trim() === "$fp") {
//                     newSplittedArr.push(variables().filePath!);
//                 } else if (sch.trim() === '$fn"') {
//                     newSplittedArr.push(
//                         variables().fileNameWithExtension! + '"'
//                     );
//                 } else if (sch.trim() === '$fnw"') {
//                     newSplittedArr.push(
//                         variables().fileNameWithoutExtension! + '"'
//                     );
//                 } else if (sch.trim() === '$fon"') {
//                     newSplittedArr.push(variables().fileFolder! + '"');
//                 } else {
//                     newSplittedArr.push(sch);
//                 }
//             });
//             newLinedArr.push(newSplittedArr.join("/"));
//         } else {
//             newLinedArr.push(ch);
//         }
//     });

//     return newLinedArr.join(" ");
// };

// const rewriter = () => {};

// NEW WAY

export const variableTransformer = (line: string) => {
    let new_line: string = line;
    new_line = new_line
        .replace(/\$fnw/gi, variables().fileNameWithoutExtension)
        .replace(/\$fn/gi, variables().fileNameWithExtension)
        .replace(/\$fon/gi, variables().fileFolder)
        .replace(/\$fps/gi, `"${variables().filePath}"`)
        .replace(/\$fp/, variables().filePath);
    return new_line;
};
