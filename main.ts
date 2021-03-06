import * as ts from "typescript";

export function walk(sourceFile: ts.SourceFile, checker: ts.TypeChecker) {
  walkNode(sourceFile);

  function walkNode(node: ts.Node) {
    if(ts.isCallExpression(node)) {
        if (ts.isPropertyAccessExpression(node.expression)) {
            const ownerType = checker.getTypeAtLocation(node.expression.expression);
            const typeNode = checker.typeToTypeNode(ownerType);
            console.log("TypeNode:");
            console.log(checker.typeToString(ownerType));
            console.log(typeNode);
            console.log("Is Array or TupleType:", typeNode && (typeNode.kind === ts.SyntaxKind.ArrayType || typeNode.kind === ts.SyntaxKind.TupleType));
        }
    }

    ts.forEachChild(node, walkNode);
  }
}

function walkProgram(program: ts.Program, checker: ts.TypeChecker) {
  for (const sourceFile of program.getSourceFiles()) {
    walk(sourceFile, checker);
  }
}

const fileNames = process.argv.slice(2);

console.log("ES6:");
let programES6 = ts.createProgram(fileNames, {target: ts.ScriptTarget.ES2015, lib: ["es6"]});
walkProgram(programES6, programES6.getTypeChecker());
console.log("");
console.log("Default:");
console.log("");
let programDefault = ts.createProgram(fileNames, {});
walkProgram(programDefault, programDefault.getTypeChecker());


