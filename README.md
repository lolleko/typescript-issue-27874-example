## HowToReproduce

`npm install`

`npx ts-node ./main.ts ./test.ts`

Change TS Version to 2.9.2 run again

## Results

For Example Code (test.ts):
```
let arrTest = [1,2,3];
arrTest.forEach((elem, index) => {});
```

**For TS 3.1.3:**

es6: false

default: true

**For TS 2.9.2:**

es6: true

default: true

boolean indicates the result for the following expression

`console.log(typeNode && (typeNode.kind === ts.SyntaxKind.ArrayType || typeNode.kind === ts.SyntaxKind.TupleType));`

typeNode is the type node of arrTest in this case (see main.ts and test.ts)

